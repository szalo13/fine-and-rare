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

export interface IProductUpdate {
  vintage?: string;
  name?: string;
  producerId?: string;
}

export interface IProductByIdQuery {
  id: string;
}

export interface IProductsByProducerIdQuery {
  producerId: string;
}

export interface ICreateProductsMutation {
  input: INewProductInput[];
}

export interface IProductUpdateMutation {
  id: string;
  input: IProduct;
}

export interface IDeleteProductsMutation {
  ids: string[];
}