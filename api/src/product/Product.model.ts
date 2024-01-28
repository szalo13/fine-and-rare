import mongoose from "mongoose";
import { IProduct } from "./product.interface";

const ProductSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  producerId: { type: mongoose.Schema.Types.ObjectId, ref: "Producer" },
});

module.exports = mongoose.model<IProduct>("Product", ProductSchema);
