import { ProducerService } from "./producer/producer.service";
import {
  ICreateProductsMutation,
  IDeleteProductsMutation,
  IProduct,
  IProductByIdQuery,
  IProductUpdateMutation,
  IProductsByProducerIdQuery,
} from "./product.interface";
import { ProductService } from "./product.service";

export const productResolvers = {
  Product: {
    producerId: (product: IProduct) => {
      return product.producerId._id.toString();
    },
    producer: async (product: IProduct) => {
      return await ProducerService.getById(product.producerId);
    },
  },
  Query: {
    productById: async (_: any, { id }: IProductByIdQuery) => {
      return await ProductService.getById(id);
    },
    productsByProducerId: async (
      _: any,
      { producerId }: IProductsByProducerIdQuery
    ) => {
      return await ProductService.getByProducerId(producerId);
    },
  },
  Mutation: {
    createProducts: async (_: any, { input }: ICreateProductsMutation) => {
      return await ProductService.createMany(input);
    },
    updateProduct: async (_: any, { id, input }: IProductUpdateMutation) => {
      return await ProductService.updateProduct(id, input);
    },
    deleteProducts: async (_: any, { ids }: IDeleteProductsMutation) => {
      return await ProductService.deleteMany(ids);
    },
  },
};
