"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BikeController_1 = require("./BikeController");
//create express router...
const router = express_1.default.Router();
//define bike CRUD routes...
router.get('/api/products', BikeController_1.BikeController.getAllBikes);
router.get('/api/products/:productId', BikeController_1.BikeController.getABike);
router.post('/api/products', BikeController_1.BikeController.createBike);
router.put('/api/products/:productId', BikeController_1.BikeController.updateABike);
router.delete('/api/products/:productId', BikeController_1.BikeController.deleteABike);
exports.BikeRoutes = { router };