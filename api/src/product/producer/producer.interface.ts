import { Document } from "mongoose";

export interface IProducer extends Document {
  name: string;
  country?: string;
  region?: string;
}

export interface INewProducerInput {
  name: string;
  country?: string;
  region?: string;
}