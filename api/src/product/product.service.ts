import ProductModel from "./Product.model";
import { INewProductInput } from "./product.interface";

export class ProductService {
  static async getById(id: string) {
    return await ProductModel.findById(id);
  }

  static async getByProducerId(producerId: string) {
    return await ProductModel.find({ producerId });
  }

  static async createMany(products: INewProductInput[]) {
    return await ProductModel.insertMany(products);
  }
}
