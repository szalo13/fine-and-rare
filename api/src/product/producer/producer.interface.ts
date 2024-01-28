import { Document } from "mongoose";

export interface IProducer extends Document {
  name: string;
  country?: string;
  region?: string;
}
