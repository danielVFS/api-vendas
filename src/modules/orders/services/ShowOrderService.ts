import { getCustomRepository } from 'typeorm';

import AppError from '@shared/errors/AppError';

import Order from '../typeorm/entities/Order';

import { OrdersRepositoty } from '../typeorm/repositories/OrdersRepository';

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepositoty);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('order not found!');
    }

    return order;
  }
}

export default ShowOrderService;
