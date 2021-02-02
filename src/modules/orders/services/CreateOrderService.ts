import { getCustomRepository } from 'typeorm';

import { OrdersRepositoty } from '../typeorm/repositories/OrdersRepository';
import { CostumersRepository } from '@modules/costumers/typeorm/repositories/CostumersRepository';
import { ProductRepositoty } from '@modules/products/typeorm/repositories/ProductsRepository';

import AppError from '@shared/errors/AppError';

import Order from '../typeorm/entities/Order';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  costumer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ costumer_id, products }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepositoty);
    const costumerRepository = getCustomRepository(CostumersRepository);
    const productsRepository = getCustomRepository(ProductRepositoty);

    const costumerExists = await costumerRepository.findById(costumer_id);

    if (!costumerExists) {
      throw new AppError('Could not find one Costumer with the given ID');
    }

    const existsProducts = await productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentsProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentsProducts.length) {
      throw new AppError(
        `Could not find product ${checkInexistentsProducts[0].id}.`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available
        for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await ordersRepository.createOrder({
      costumer: costumerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.id,
      quantity:
        existsProducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
