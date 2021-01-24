import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import UsersController from '../controllers/UsersController';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.get('/', isAuthenticated, usersController.index);
userRoutes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

export default userRoutes;
