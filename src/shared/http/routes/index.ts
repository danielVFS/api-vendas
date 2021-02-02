import { Router } from 'express';

import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/users.routes';
import sessionsRoutes from '@modules/users/routes/sessions.routes';
import passwordRoutes from '@modules/users/routes/password.routes';
import profileRoutes from '@modules/users/routes/profile.routes';
import costumerRoutes from '@modules/costumers/routes/costumers.routes';
import ordersRoutes from '@modules/orders/routes/orders.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRoutes);
routes.use('/password', passwordRoutes);
routes.use('/profile', profileRoutes);
routes.use('/costumers', costumerRoutes);
routes.use('/orders', ordersRoutes);

export default routes;
