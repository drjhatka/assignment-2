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
exports.OrderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema_1 = require("./OrderSchema");
const create = (order) => __awaiter(void 0, void 0, void 0, function* () { return yield OrderSchema_1.OrderModel.create(order); });
const getOne = (productId) => __awaiter(void 0, void 0, void 0, function* () { return yield OrderSchema_1.OrderModel.find({ productId: new mongoose_1.default.Types.ObjectId(productId) }); });
const getAll = () => __awaiter(void 0, void 0, void 0, function* () { return yield OrderSchema_1.OrderModel.find({}); });
const calculateTotalRevenue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield OrderSchema_1.OrderModel.aggregate([
            // Step 1: Join `Order` with `Product`
            {
                $addFields: {
                    productId: { $toObjectId: "$productId" }, // Convert string to ObjectId
                },
            },
            {
                $lookup: {
                    from: 'bikes',
                    localField: 'productId', // Field in Order
                    foreignField: '_id', // Field in Product
                    as: 'productDetails', // Alias for the joined data
                },
            },
            // Step 2: Unwind the `productDetails` array (since `$lookup` returns an array)
            {
                $unwind: '$productDetails',
            },
            //Step 3: Calculate revenue for each order
            {
                $project: {
                    productId: 1,
                    quantity: 1,
                    price: '$productDetails.price',
                    revenue: { $multiply: ['$quantity', '$productDetails.price'] },
                },
            },
            // Step 4: Group by product or calculate total revenue
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$revenue' }, // Sum up all revenues
                },
            },
        ]);
        return res[0].totalRevenue;
    }
    catch (err) {
        console.error(err);
    }
});
exports.OrderServices = {
    create,
    getOne,
    getAll,
    calculateTotalRevenue
};
