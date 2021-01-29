import { getCustomRepository } from 'typeorm';

import { CostumersRepository } from '../typeorm/repositories/CostumersRepository';

import Costumer from '../typeorm/entities/Costumer';

class ListCostumerService {
  public async execute(): Promise<Costumer[]> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const costumers = await costumerRepository.find();

    return costumers;
  }
}

export default ListCostumerService;
