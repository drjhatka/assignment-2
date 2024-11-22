import { Request, Response } from "express";
import ZodBikeSchema from "../validators/ZodBikeSchema";
import { BikeServices } from "./BikeServices";
import { ZodError } from "zod";
import mongoose from 'mongoose';




const createBike = async (req: Request, res: Response) => {
    try {
        const { bike } = req.body     // assuming the object has a bike element which includes the bike object
        ZodBikeSchema.parse(bike) // use validate for joi and parse for zod library.
        //save into database
        const result = await BikeServices.create(bike)
        res.status(200).json({
            success: true,
            message: "Bike Created Successfully",
            data: result
        })
    } catch (error) {
        if (error instanceof ZodError) {
            res.send({ errors: error.issues, stackTrace: error.stack })
        }
        console.log(error)

    }
}
const getABike = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.productId
        const result = await BikeServices.getOne(id)
        if (result?.length != 0) {
            res.status(200).json({
                message: "Bike Retrieved Successfully",
                status: true,
                data: result
            })
        }
    } catch (error) {
        res.json({ message: "Bike not available", success: false, error: error })
    }
}
const getAllBikes = async (req: Request, res: Response) => {
    try {
        if (!req.query.searchTerm) {
            res.json({
                status: false,
                message: "Search Term is Required!"
            })
        }
        const result = await BikeServices.getAll(req.query.searchTerm as string)
        if (result?.length != 0) { //result is not empty so bike is available
            res.status(200).json({
                message: "Bike Retrieved Successfully",
                status: true,
                data: result
            })
        }
        else { //check if the result returns an empty array...
            res.json({ success: false, message: "Bike(s) not available" })
        }
    } catch (error) {
        console.log(error)
    }
}
const updateABike = async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const productId: string = req.params.productId
        const modifiedCount = await BikeServices.updateOne(productId, req.body)
        if (modifiedCount && Object.keys(req.body).length > 0) {
            res.status(200).json({
                message: "Bike updated successfully",
                modified: true,
                data: await BikeServices.getOne(productId),
                changedFields: req.body
            })
        }
        else {
            res.json({ message: "Bike not found for update", modified: false })
        }
    } catch (error) {
        console.log(error)
    }
}
const deleteABike = async (req: Request, res: Response) => {
    try {
        const productId = req.params.productId;
        const deleted = await BikeServices.deleteOne(productId)
        if (deleted) {
            res.json({ message: "Product Deleted Successfully", success: true, data: {} })
        }
        res.json({ success: false, message: "Unable to Delete Check Product ID Again" })

    } catch (error) {
        console.log(error)
    }
}

export const BikeController = {
    createBike,
    getABike,
    getAllBikes,
    updateABike,
    deleteABike
}