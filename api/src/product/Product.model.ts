import mongoose from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  vintage: { type: String, required: true },
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
});

ProductSchema.index({ name: 1, vintage: 1, producerId: 1 }, { unique: true });

export default mongoose.model<IProduct>("Product", ProductSchema);
