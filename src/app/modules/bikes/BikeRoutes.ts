import express from 'express';
import { BikeController } from './BikeController';

//create express router...
const router = express.Router();

//define bike CRUD routes...

    router.get('/products', BikeController.getAllBikes)
    router.get('/products/:productId', BikeController.getABike)
    router.post('/products', BikeController.createBike)
    router.put('/products/:productId', BikeController.updateABike)
    router.delete('/products/:productId', BikeController.deleteABike)


export const BikeRoutes = {router};