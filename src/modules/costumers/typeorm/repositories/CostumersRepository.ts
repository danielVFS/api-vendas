import { EntityRepository, Repository } from 'typeorm';

import Costumer from '../entities/Costumer';

@EntityRepository(Costumer)
export class CostumersRepository extends Repository<Costumer> {
  async findByName(name: string): Promise<Costumer | undefined> {
    const costumer = this.findOne({
      where: {
        name,
      },
    });

    return costumer;
  }

  async findById(id: string): Promise<Costumer | undefined> {
    const costumer = this.findOne({
      where: {
        id,
      },
    });

    return costumer;
  }

  async findByEmail(email: string): Promise<Costumer | undefined> {
    const costumer = this.findOne({
      where: {
        email,
      },
    });

    return costumer;
  }
}
