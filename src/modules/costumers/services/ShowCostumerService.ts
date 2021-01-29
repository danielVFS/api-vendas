import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { CostumersRepository } from '../typeorm/repositories/CostumersRepository';

import Costumer from '../typeorm/entities/Costumer';

interface IRequest {
  id: string;
}

class ShowCostumerService {
  public async execute({ id }: IRequest): Promise<Costumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumerRepository.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found!');
    }

    return costumer;
  }
}

export default ShowCostumerService;
