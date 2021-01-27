import { getCustomRepository } from 'typeorm';

import { UserRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokenRepository } from '../typeorm/repositories/UserTokensRepository';

import EtherealMail from '@config/mail/EtherealMail';

import AppError from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

class SendForgotEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(UserTokenRepository);

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await userTokensRepository.generate(user.id);

    console.log(token);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API VENDAS] Recuperação de senha',
      templateData: {
        template: `Olá {{name}}: Solicitiação de redefinição de senha recebida {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}

export default SendForgotEmailService;
