import ProductModel from "./Product.model";
import ProducerModel from "./producer/Producer.model";
import { IProduct } from "./product.interface";

interface IProductByIdQuery {
  id: string;
}

interface IProductsByProducerIdQuery {
  producerId: string;
}

export const productResolvers = {
  Product: {
    producerId: (product: IProduct) => {
      return product.producerId._id.toString();
    },
    producer: async (product: IProduct) => {
      return await ProducerModel.findById(product.producerId);
    },
  },
  Query: {
    productById: async (_: any, { id }: IProductByIdQuery) => {
      return await ProductModel.findById(id);
    },
    productsByProducerId: async (
      _: any,
      { producerId }: IProductsByProducerIdQuery
    ) => {
      return await ProductModel.find({ producerId });
    },
  },
};
