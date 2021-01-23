import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../typeorm/repositories/UsersRepository';

import User from '../typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret e-mail/password combination', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password incorrect', 401);
    }

    return user;
  }
}

export default CreateSessionService;
