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
exports.BikeServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const BikeSchema_1 = require("./BikeSchema");
//define CRUD operations on the bikes (products) here
//start with GPUD order...
const create = (bike) => __awaiter(void 0, void 0, void 0, function* () { return yield BikeSchema_1.BikeModel.create(bike); });
const getOne = (Id) => __awaiter(void 0, void 0, void 0, function* () { return yield BikeSchema_1.BikeModel.find({ _id: new mongoose_1.default.Types.ObjectId(Id) }); });
const getAll = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    // build a search condition...
    let filter = {};
    let result = null;
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
        filter = {
            $or: [{ name: regex }, { brand: regex }, { category: regex }]
        };
        result = yield BikeSchema_1.BikeModel.find(filter);
    }
    return result;
});
const updateOne = (productId, updatedDoc) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield BikeSchema_1.BikeModel.updateOne({ _id: new mongoose_1.default.Types.ObjectId(productId) }, {
            $set: updatedDoc // using bike interface type on updatedDoc doesn't allow extra fields to be added, but still shows a false flag of modified count
        });
        if ((yield result.modifiedCount) === 1 && result.matchedCount === 1) {
            return true;
        }
        return false;
    }
    catch (err) {
        console.log('error', err);
    }
});
const deleteOne = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = BikeSchema_1.BikeModel.deleteOne({ _id: new mongoose_1.default.Types.ObjectId(productId) });
    if ((yield result).deletedCount == 1) {
        return true;
    }
    return false;
});
exports.BikeServices = {
    create,
    getOne,
    getAll,
    updateOne,
    deleteOne
};
