import { getCustomRepository } from 'typeorm';

import { ProductRepositoty } from '../typeorm/repositories/ProductsRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const productsRepository = getCustomRepository(ProductRepositoty);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!');
    }

    await productsRepository.remove(product);
  }
}

export default DeleteProductService;