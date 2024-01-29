import fs from "fs";
import csv from "csv-parser";

const FILE_PATH = "public/all_listings.csv";
const BATCH_SIZE = 100;

const batch = [];

/**
 * 1. Fetches CVS as NodeJS Stream
 * 2. Groups by Vintage + ProductName + Producer
 * 3. Creates a new Product if not exists
 * 4. IF stream failed, only console log results
 */
const synchronizeProducts = async () => {
  try {
    console.log("Synchronizing products...");
  } catch (error) {
    console.log(error);
  }
};

export default synchronizeProducts;
