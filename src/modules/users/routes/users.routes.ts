import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import uploadConfig from '@config/upload';

import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const userRoutes = Router();

const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

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
userRoutes.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.create,
);

export default userRoutes;
