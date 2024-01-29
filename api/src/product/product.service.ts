import ProductModel from "./Product.model";

export class ProductService {
  static async getById(id: string) {
    return await ProductModel.findById(id);
  }

  static async getByProducerId(producerId: string) {
    return await ProductModel.find({ producerId });
  }
}
