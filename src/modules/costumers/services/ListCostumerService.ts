import { getCustomRepository } from 'typeorm';

import { CostumersRepository } from '../typeorm/repositories/CostumersRepository';

import Costumer from '../typeorm/entities/Costumer';

interface IPaginateCostumer {
  from: number;
  to: number;
  per_page: number;
  total: number;
  current_page: number;
  prev_page: number;
  next_page: number;
  data: Costumer[];
}

class ListCostumerService {
  public async execute(): Promise<IPaginateCostumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    //const costumers = await costumerRepository.find();
    const costumers = await costumerRepository.createQueryBuilder().paginate();

    return costumers as IPaginateCostumer;
  }
}

export default ListCostumerService;
