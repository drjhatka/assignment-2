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
const CustomResponse_1 = require("../utilities/CustomResponse");
const CustomErrors_1 = require("../utilities/CustomErrors");
const createBike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { bike } = req.body; // assuming the object has a bike element which includes the bike object
        ZodBikeSchema_1.default.parse(bike); // use validate for joi and parse for zod library.
        //save into database
        const result = yield BikeServices_1.BikeServices.create(bike);
        CustomResponse_1.CustomResponse.fireCustomResponse(res, 200, true, 'Bike Created Successfully', result);
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            CustomErrors_1.CustomError.fireCustomError(res, 400, false, error.issues, (_a = error.stack) === null || _a === void 0 ? void 0 : _a.toString());
        }
    }
});
const getABike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.productId;
        const result = yield BikeServices_1.BikeServices.getOne(id);
        if (result && 'result.$isValid()') {
            CustomResponse_1.CustomResponse.fireCustomResponse(res, 200, true, 'Bike Retrieved Successfully', result);
        }
    }
    catch (error) {
        CustomResponse_1.CustomResponse.fireCustomResponse(res, 400, false, 'Bike not available');
        //res.send({success:false, error:'Bike not Available'})
        //CustomError.fireCustomError(res,404,false,'Bike not Available',Error.prepareStackTrace?.toString())
    }
});
const getAllBikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.query.searchTerm) {
            CustomResponse_1.CustomResponse.fireCustomResponse(res, 200, true, 'Search Term is Required!');
        }
        const result = yield BikeServices_1.BikeServices.getAll(req.query.searchTerm);
        if ((result === null || result === void 0 ? void 0 : result.length) != 0) { //result is not empty so bike is available
            res.status(200).json({ message: "Bikes Retrieved Successfully", status: true, data: result });
        }
        else { //check if the result returns an empty array...
            res.json({ success: false, message: "Bike(s) not available" });
        }
    }
    catch (error) {
        res.json({ success: false, message: "Bike(s) not available", error: error });
    }
});
const updateABike = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const modifiedCount = yield BikeServices_1.BikeServices.updateOne(productId, req.body);
        if (modifiedCount) {
            res.status(200).json({
                message: "Bike updated successfully",
                modified: true,
                data: yield BikeServices_1.BikeServices.getOne(productId),
                changedFields: req.body
            });
        }
    }
    catch (error) {
        console.log("Error", error);
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
        res.status(404).json({ success: false, message: "Unable to Delete Check Product ID Again", error: error });
    }
});
exports.BikeController = {
    createBike,
    getABike,
    getAllBikes,
    updateABike,
    deleteABike
};
