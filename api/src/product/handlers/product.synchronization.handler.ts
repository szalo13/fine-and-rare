import fs from "fs";
import csv from "csv-parser";
import { INewProductInput } from "../product.interface";
import { ProducerService } from "../producer/producer.service";
import { ProductService } from "../product.service";

export const ProductSynchronizationHandler = () => {
  const FILE_PATH = "public/all_listings.csv";
  const BATCH_SIZE = 100;
  const UNKNOWN_PRODUCER_NAME = "Unknown";

  let producerIdCache = new Map();

  let currentBatch: any[] = [];
  let failedBatchesCount = 0;

  const findOrCreateProducerIdAndCache = async (
    producerName: string
  ): Promise<string | undefined> => {
    try {
      const producer =
        (await ProducerService.getByName(producerName)) ||
        (await ProducerService.create({ name: producerName }));

      if (producer) {
        const producerId = producer._id.toString();
        producerIdCache.set(producerName, producerId);
        return producerId;
      }
    } catch (error) {
      console.error(`Failed to find or create producer ${producerName}`);
    }
  };

  const upsertBatch = async (rows: any[]) => {
    try {
      const products: INewProductInput[] = [];

      for await (const row of rows) {
        const producerName = row.Producer || UNKNOWN_PRODUCER_NAME;
        const producerId =
          producerIdCache.get(producerName) ||
          (await findOrCreateProducerIdAndCache(producerName));

        if (producerId) {
          products.push({
            name: row["Product Name"],
            vintage: row.Vintage,
            producerId: producerId,
          });
        }
      }

      await ProductService.createMany(products, { ordered: false });
    } catch (error) {
      console.error(error);
      failedBatchesCount++;
    }
  };

  const onDataRead = async (row: any) => {
    currentBatch.push(row);

    if (currentBatch.length === BATCH_SIZE) {
      upsertBatch([...currentBatch]);
      currentBatch = [];
    }
  };

  const onDataReadEnd = async () => {
    if (currentBatch.length) {
      await upsertBatch([...currentBatch]);
      currentBatch = [];
    }
    console.log(`Products synchronized. Failed batches: ${failedBatchesCount}`);
  };

  const synchronizeProducts = async () => {
    try {
      console.log("Synchronizing products...");
      const csvStream = fs.createReadStream(FILE_PATH).pipe(csv());

      for await (const row of csvStream) {
        await onDataRead(row);
      }

      await onDataReadEnd();
    } catch (error) {
      console.error("Products synchronized with errors");
      console.error(error);
    }
  };

  return { synchronizeProducts };
};
