import ProducerModel from "./Producer.model";

export class ProducerService {
  static async getById(id: string) {
    return ProducerModel.findById(id);
  }
}
