import { ProducerService } from "./producer/producer.service";
import { INewProductInput, IProduct } from "./product.interface";
import { ProductService } from "./product.service";

interface IProductByIdQuery {
  id: string;
}

interface IProductsByProducerIdQuery {
  producerId: string;
}

interface ICreateProductsMutation {
  input: INewProductInput[];
}

interface IProductUpdateMutation {
  id: string;
  input: IProduct;
}

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
      console.log(id, input);
      return await ProductService.updateProduct(id, input);
    },
  },
};
