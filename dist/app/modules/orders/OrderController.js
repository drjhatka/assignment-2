"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const zod_1 = require("zod");
const ZodOrderSchema_1 = __importDefault(require("../validators/ZodOrderSchema"));
const CustomResponse_1 = require("../utilities/CustomResponse");
const CustomErrors_1 = require("../utilities/CustomErrors");
const OrderServices_1 = require("./OrderServices");
const BikeSchema_1 = require("../bikes/BikeSchema");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const order = req.body; // assuming the object has a order element which includes the order object
        //validate with Zod ...
        ZodOrderSchema_1.default.parse(order); // use validate for joi and parse for zod library.
        //fetch bike related to order...
        //console.log(await BikeServices.getOne(order.productId))
        console.log(order.productId);
        const bike = yield BikeSchema_1.BikeModel.findOne({ _id: new mongoose_1.default.Types.ObjectId(order.productId) });
        //check if the quantity is available for the specified product...
        if (!bike.inStock) {
            CustomResponse_1.CustomResponse.fireCustomResponse(res, 400, false, 'Bike Out of Stock');
        }
        else {
            if (bike.quantity < order.quantity) {
                CustomResponse_1.CustomResponse.fireCustomResponse(res, 400, false, 'Order Quantity cannot be more than currently available stock', order);
            }
            else if (order.quantity - bike.quantity === 0) {
                //console.log(order.quantity-bike.quantity)
                //set the inStock method to false...
                bike.inStock = false;
                bike.quantity = 0;
                yield BikeSchema_1.BikeModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(order.productId) }, bike);
                //await BikeServices.updateOne(order.productId, bike!)
                //create order in the DB
                const result = yield OrderServices_1.OrderServices.create(order);
                CustomResponse_1.CustomResponse.fireCustomResponse(res, 200, true, 'Order Created Successfully', result);
            }
            else {
                //otherwise store in DB...
                bike.quantity = bike.quantity - order.quantity;
                yield BikeSchema_1.BikeModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(order.productId) }, bike);
                const result = yield OrderServices_1.OrderServices.create(order);
                CustomResponse_1.CustomResponse.fireCustomResponse(res, 200, true, 'Product Stock Updated', result);
            }
        }
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            CustomErrors_1.CustomError.fireCustomError(res, 400, false, error.issues, (_a = error.stack) === null || _a === void 0 ? void 0 : _a.toString());
        }
        console.log(error);
    }
});
const calculateRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const revenueTotal = yield OrderServices_1.OrderServices.calculateTotalRevenue();
    res.status(200).json({ message: "Revenue calculated successfully", status: true, data: { totalRevenue: revenueTotal } });
});
exports.OrderController = {
    createOrder,
    calculateRevenue
};
