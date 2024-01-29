import ProductModel from "./Product.model";
import { INewProductInput, IProductUpdate } from "./product.interface";

const updateFields = (entity: any, input: any) => {
  Object.keys(input).forEach((key) => {
    entity[key] = input[key];
  });
};

interface IBulkCreateOptions {
  ordered?: boolean;
}

export class ProductService {
  static async getById(id: string) {
    return await ProductModel.findById(id);
  }

  static async getByProducerId(producerId: string) {
    return await ProductModel.find({ producerId });
  }

  static async createMany(
    products: INewProductInput[],
    opts: IBulkCreateOptions = { ordered: true }
  ) {
    return await ProductModel.insertMany(products, opts);
  }

  static async updateProduct(id: string, input: IProductUpdate) {
    const product = await ProductModel.findById(id);
    if (!product) throw new Error("Product not found");

    updateFields(product, input);
    await product.validate();
    return await product.save();
  }

  static async deleteMany(ids: string[]) {
    return await ProductModel.deleteMany({ _id: { $in: ids } });
  }
}
