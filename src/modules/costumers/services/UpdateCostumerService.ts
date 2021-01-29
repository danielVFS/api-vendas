import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import { CostumersRepository } from '../typeorm/repositories/CostumersRepository';

import Costumer from '../typeorm/entities/Costumer';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateCostumerService {
  public async execute({ id, name, email }: IRequest): Promise<Costumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const costumer = await costumerRepository.findById(id);

    if (!costumer) {
      throw new AppError('Costumer not found!');
    }

    const userUpdateEmail = await costumerRepository.findByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== id) {
      throw new AppError('E-mail already in use.');
    }

    costumer.name = name;
    costumer.email = email;

    await costumerRepository.save(costumer);

    return costumer;
  }
}

export default UpdateCostumerService;
