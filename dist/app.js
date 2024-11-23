"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const BikeRoutes_1 = require("./app/modules/bikes/BikeRoutes");
const RouteUnavailable_1 = __importDefault(require("./app/modules/errors/RouteUnavailable"));
const OrderRoutes_1 = require("./app/modules/orders/OrderRoutes");
//set up server configurations...
const app = (0, express_1.default)();
app.use(express_1.default.json()); //use json perser
app.use((0, cors_1.default)());
// call application routes....
app.use('/api', BikeRoutes_1.BikeRoutes.router); //use the bike routes defined in the bike router
app.use('/api', OrderRoutes_1.OrderRoutes.router); //use the bike routes defined in the bike router
//use middleware for invalid routes...
app.use(RouteUnavailable_1.default);
exports.default = app;
