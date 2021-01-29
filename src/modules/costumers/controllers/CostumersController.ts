import { Request, Response } from 'express';

import CreateCostumerService from '../services/CreateCostumerService';
import ListCostumerService from '../services/ListCostumerService';
import DeleteCostumerService from '../services/DeleteCostumerService';
import ShowCostumerService from '../services/ShowCostumerService';
import UpdateCostumerService from '../services/UpdateCostumerService';

export default class CostumersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCostumers = new ListCostumerService();

    const costumers = await listCostumers.execute();

    return response.json(costumers);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCostumer = new CreateCostumerService();

    const user = await createCostumer.execute({ name, email });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listCostumer = new ShowCostumerService();

    const costumer = await listCostumer.execute({ id });

    return response.json(costumer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCostumer = new UpdateCostumerService();

    const costumer = await updateCostumer.execute({
      id,
      name,
      email,
    });

    return response.json(costumer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCostumer = new DeleteCostumerService();

    await deleteCostumer.execute({ id });

    return response.status(204).json({ message: 'Costumer deleted' });
  }
}
