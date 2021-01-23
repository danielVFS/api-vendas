import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '../typeorm/repositories/UsersRepository';

import User from '../typeorm/entities/User';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorret e-mail/password combination', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password incorrect', 401);
    }

    const token = sign({}, process.env.SECRET_KEY ?? '', {
      subject: user.id,
      expiresIn: process.env.EXPIRES_IN,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
