import { getCustomRepository } from 'typeorm';

import { ProductRepositoty } from '../typeorm/repositories/ProductsRepository';

import Product from '../typeorm/entities/Product';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepositoty);

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
