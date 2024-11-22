import express from 'express';
import { BikeController } from './BikeController';

//create express router...
const router = express.Router();

//define bike CRUD routes...
//router.get('/api/products', BikeController.getAllBikes)
router.get('/api/products/:productId', BikeController.getABike)
router.post('/api/products', BikeController.createBike)
router.put('/api/products/:productId', BikeController.updateABike)
router.delete('/api/products/:productId', BikeController.deleteABike)

export const BikeRoutes = {router};