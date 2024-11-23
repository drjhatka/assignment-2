import express from 'express';
import { OrderController } from './OrderController';
import { noEmptyCreate } from '../middleware/NoEmptyCreate';

//create express router...
const router = express.Router();

//define bike CRUD routes...

    // router.get('/api/products', OrderController.getAllBikes)
    // router.get('/api/products/:productId', OrderController.getABike)
    router.post('/orders', OrderController.createOrder)
    // router.put('/api/products/:productId', OrderController.updateABike)
    // router.delete('/api/products/:productId', OrderController.deleteABike)


export const OrderRoutes = {router};