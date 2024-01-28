import mongoose from "mongoose";
import fixtureData from "./data";
import ProducerModel from "../product/producer/Producer.model";
import connectDB from "../db";
import { DB_HOST, DB_NAME, DB_PORT } from "../const";
import { IProducer } from "../product/producer/producer.interface";
import ProductModel from "../product/Product.model";

const { producerData, productData } = fixtureData;

const seedDatabase = async () => {
  try {
    connectDB(DB_HOST, DB_PORT, DB_NAME);

    await mongoose.connection.dropDatabase(); // Use with caution!

    const insertedProducers = await ProducerModel.insertMany(producerData);
    const producerMap = insertedProducers.reduce(
      (
        acc: Record<string, typeof mongoose.Types.ObjectId>,
        producer: IProducer
      ) => {
        acc[producer.name] = producer._id;
        return acc;
      },
      {}
    );
    const productsWithProducerIds = productData.map((product) => ({
      vintage: product.vintage,
      name: product.name,
      producerId: producerMap[product.producerName],
    }));
    await ProductModel.insertMany(productsWithProducerIds);

    console.log("Database seeded successfully");
  } catch (error) {
    console.log(error);
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
