import { Request, Response } from 'express';

import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

export default class ProductsController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showProduct = new ShowOrderService();

    const product = await showProduct.execute({ id });

    return response.json(product);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { costumer_id, products } = request.body;

    const createOrder = new CreateOrderService();

    const order = await createOrder.execute({ costumer_id, products });

    return response.json(order);
  }
}
