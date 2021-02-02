import { EntityRepository, Repository } from 'typeorm';

import Order from '../entities/Order';

import Costumer from '@modules/costumers/typeorm/entities/Costumer';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  costumer: Costumer;
  products: IProduct[];
}

@EntityRepository(Order)
export class OrdersRepositoty extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = await this.findOne(id, {
      relations: ['order_products', 'costumer'],
    });

    return order;
  }

  public async createOrder({ costumer, products }: IRequest): Promise<Order> {
    const order = this.create({
      costumer,
      order_products: products,
    });

    await this.save(order);

    return order;
  }
}
