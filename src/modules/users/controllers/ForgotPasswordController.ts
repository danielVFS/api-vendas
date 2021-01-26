import { Request, Response } from 'express';

import SendForgotEmailService from '../services/SendForgotEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotEmailPassword = new SendForgotEmailService();

    await sendForgotEmailPassword.execute({ email });

    return response.status(204).json();
  }
}
