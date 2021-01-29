import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { CostumersRepository } from '../typeorm/repositories/CostumersRepository';

interface IRequest {
  id: string;
}

class DeleteCostumerService {
  public async execute({ id }: IRequest): Promise<void> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumerRepository.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found!');
    }

    await costumerRepository.delete(costumer);
  }
}

export default DeleteCostumerService;
