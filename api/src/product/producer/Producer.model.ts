import mongoose from "mongoose";
import { IProducer } from "./producer.interface";

const ProducerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: String,
  region: String,
});

export default mongoose.model<IProducer>("Producer", ProducerSchema);
