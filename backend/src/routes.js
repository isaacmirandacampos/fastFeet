import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import ShipperController from './app/controllers/ShipperController';
import FileController from './app/controllers/FileController';
import OrderController from './app/controllers/OrderController';

import authMiddlewares from './app/middlewares/auth';

const routes = Router();
const uploads = multer(multerConfig);

routes.post('/register', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddlewares);
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.get('/shippers', ShipperController.index);
routes.post('/shippers', ShipperController.store);
routes.put('/shippers/:id', ShipperController.update);
routes.delete('/shippers/:id', ShipperController.delete);

routes.post(
  '/shippers/:id/files',
  uploads.single('file'),
  FileController.store
);

routes.get('/orders', OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

export default routes;
