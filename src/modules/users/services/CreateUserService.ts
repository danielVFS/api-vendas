import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../typeorm/repositories/UsersRepository';

import User from '../typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const emailExists = await userRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('E-mail adress already used');
    }

    const user = await userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
