import mongoose from "mongoose";

const connectDB = async (
  host: string,
  port: string,
  dbName: string
): Promise<void> => {
  try {
    await mongoose.connect(`mongodb://${host}:${port}/${dbName}`);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
