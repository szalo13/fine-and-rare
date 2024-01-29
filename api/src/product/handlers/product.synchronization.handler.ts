import fs from "fs";
import csv from "csv-parser";
import { INewProductInput } from "../product.interface";
import { ProducerService } from "../producer/producer.service";
import { ProductService } from "../product.service";

export const ProductSynchronizationHandler = () => {
  const FILE_PATH = "public/all_listings.csv";
  const BATCH_SIZE = 100;
  const UNKNOWN_PRODUCER_NAME = "Unknown";

  const producerNameToIdMap: Record<string, string> = {};

  let currentBatch: any[] = [];
  let batchesCount = 0;
  let failedBatchesCount = 0;

  /**
   * 1. Rerturns producer id from cache if exists
   * 2. Gets producer by name from DB
   * 3. If producer exists, returns its id
   * 4. If producer does not exist, creates a new producer and returns its id
   */
  const getProducerIdByName = async (producerName: string): Promise<string> => {
    try {
      if (producerNameToIdMap[producerName]) {
        return producerNameToIdMap[producerName];
      }

      const producer = await ProducerService.getByName(producerName);
      if (producer) {
        producerNameToIdMap[producerName] = producer._id.toString();
        return producer._id;
      }

      const newProducer = await ProducerService.create({ name: producerName });
      producerNameToIdMap[producerName] = newProducer._id.toString();
      return newProducer._id.toString();
    } catch (error) {
      console.error(`Failed to get producer id by name: ${producerName}`);
      return "";
    }
  };

  /**
   * 1. Creates a new product for each row
   * 2. If any product creation fails, returns false (batch failed)
   * Association between product and producer is made by producer name
   */
  const upsertBatch = async (rows: any[]): Promise<Boolean> => {
    try {
      batchesCount++;
      const products: INewProductInput[] = [];

      for await (const row of rows) {
        const producerId = await getProducerIdByName(
          row.Producer || UNKNOWN_PRODUCER_NAME
        );

        if (producerId) {
          products.push({
            vintage: row.Vintage,
            name: row["Product Name"],
            producerId,
          } as INewProductInput);
        }
      }

      await ProductService.createMany(products);
      return true;
    } catch (error) {
      failedBatchesCount++;
      return false;
    }
  };

  const handleData = async (row: any) => {
    let anyBatchFailed = false;
    currentBatch.push(row);

    if (currentBatch.length === BATCH_SIZE) {
      const succeded = upsertBatch([...currentBatch]);
      currentBatch = [];

      if (!succeded) {
        anyBatchFailed = true;
      }
    }
  };

  const handleEnd = async () => {
    if (currentBatch.length) {
      await upsertBatch(currentBatch);
      currentBatch = [];
    }
    console.log(
      `Products synchronized. ${JSON.stringify({
        batchesCount,
        failedBatchesCount,
      })}`
    );
  };

  /**
   * 1. Fetches CVS as NodeJS Stream
   * 2. Groups by Vintage + ProductName + Producer
   * 3. Creates a new Product if not exists
   * 4. IF stream failed, only console log results
   * 5. IF stream succeded, console log results and exit
   * 6. If product row has empty Producer, adding it to producer with name "Unknown"
   */
  const synchronizeProducts = async () => {
    try {
      console.log("Synchronizing products...");
      const csvStream = fs.createReadStream(FILE_PATH).pipe(csv());

      for await (const row of csvStream) {
        await handleData(row);
      }

      await handleEnd();
    } catch (error) {
      console.error("Products synchronized with errors");
      console.error(error);
    }
  };

  return { synchronizeProducts };
};
