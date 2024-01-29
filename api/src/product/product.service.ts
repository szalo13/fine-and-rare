import ProductModel from "./Product.model";
import { INewProductInput, IProductUpdate } from "./product.interface";

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

  static async updateProduct(id: string, input: IProductUpdate) {
    return ProductModel.findOneAndUpdate({ _id: id }, input);
  }
}
