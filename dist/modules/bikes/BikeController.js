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
exports.BikeController = void 0;
const ZodBikeSchema_1 = __importDefault(require("../validators/ZodBikeSchema"));
const BikeServices_1 = require("./BikeServices");
const zod_1 = require("zod");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bike } = req.body; // assuming the object has a bike element which includes the bike object
        ZodBikeSchema_1.default.parse(bike); // use validate for joi and parse for zod library.
        //save into database
        const result = yield BikeServices_1.BikeServices.create(bike);
        res.status(200).json({
            success: true,
            message: "Bike Created Successfully",
            data: result
        });
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            res.send({ errors: error.issues, stackTrace: error.stack });
        }
        console.log(error);
    }
});
const getABike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield BikeServices_1.BikeServices.getOne(id);
        if ((result === null || result === void 0 ? void 0 : result.length) != 0) {
            res.status(200).json({
                message: "Bike Retrieved Successfully",
                status: true,
                data: result
            });
        }
    }
    catch (error) {
        res.status(404).json({ message: "Bike not available", success: false, error: error });
    }
});
const getAllBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.searchTerm) {
            res.json({
                status: false,
                message: "Search Term is Required!"
            });
        }
        const result = yield BikeServices_1.BikeServices.getAll(req.query.searchTerm);
        if ((result === null || result === void 0 ? void 0 : result.length) != 0) { //result is not empty so bike is available
            res.status(200).json({
                message: "Bike Retrieved Successfully",
                status: true,
                data: result
            });
        }
        else { //check if the result returns an empty array...
            res.json({ success: false, message: "Bike(s) not available" });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const updateABike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const productId = req.params.productId;
        const modifiedCount = yield BikeServices_1.BikeServices.updateOne(productId, req.body);
        if (modifiedCount && Object.keys(req.body).length > 0) {
            res.status(200).json({
                message: "Bike updated successfully",
                modified: true,
                data: yield BikeServices_1.BikeServices.getOne(productId),
                changedFields: req.body
            });
        }
        else {
            res.status(404).json({ message: "Bike not found for update", modified: false });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const deleteABike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const deleted = yield BikeServices_1.BikeServices.deleteOne(productId);
        if (deleted) {
            res.json({ message: "Product Deleted Successfully", success: true, data: {} });
        }
        res.status(404).json({ success: false, message: "Unable to Delete Check Product ID Again" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.BikeController = {
    createBike,
    getABike,
    getAllBikes,
    updateABike,
    deleteABike
};
