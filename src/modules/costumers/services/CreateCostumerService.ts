import { getCustomRepository } from 'typeorm';

import { CostumersRepository } from '../typeorm/repositories/CostumersRepository';

import Costumer from '../typeorm/entities/Costumer';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
}

class CreateCostumerService {
  public async execute({ name, email }: IRequest): Promise<Costumer> {
    const costumerRepository = getCustomRepository(CostumersRepository);

    const emailExists = await costumerRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail adress already used');
    }

    const costumer = await costumerRepository.create({
      name,
      email,
    });

    await costumerRepository.save(costumer);

    return costumer;
  }
}

export default CreateCostumerService;
