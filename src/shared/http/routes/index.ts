import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import passwordRoutes from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);

export default routes;
