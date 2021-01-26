import { getCustomRepository } from 'typeorm';

import UserToken from '../typeorm/entities/UserToken';

import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokensRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

class SendForgotEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokenSRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const token = await userTokenSRepository.generate(user.id);

    console.log(token);
  }
}

export default SendForgotEmailService;
