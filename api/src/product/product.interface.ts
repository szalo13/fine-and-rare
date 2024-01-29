import { IProducer } from "./producer/producer.interface";

export interface IProduct extends Document {
  vintage: string;
  name: string;
  producerId: IProducer["_id"];
}

export interface INewProductInput {
  vintage: string;
  name: string;
  producerId: string;
}
