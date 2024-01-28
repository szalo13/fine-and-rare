import { IProducer } from "./producer/producer.interface";

export interface IProduct extends Document {
  vintage: string;
  name: string;
  producerId: IProducer["_id"];
}
