import mongoose from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
});

export default mongoose.model<IProduct>("Product", ProductSchema);
