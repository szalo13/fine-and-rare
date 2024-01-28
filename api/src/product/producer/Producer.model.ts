import mongoose from "mongoose";
import { IProducer } from "./producer.interface";

const ProducerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  country: String,
  region: String,
});

export default mongoose.model<IProducer>("Producer", ProducerSchema);
