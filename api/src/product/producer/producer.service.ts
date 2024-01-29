import ProducerModel from "./Producer.model";

interface ICreateProducerInput {
  name: string;
  country?: string;
  region?: string;
}

export class ProducerService {
  static async getById(id: string) {
    return ProducerModel.findById(id);
  }

  static async getByName(name: string) {
    return ProducerModel.findOne({ name });
  }

  static async create(input: ICreateProducerInput) {
    return ProducerModel.create(input);
  }
}
