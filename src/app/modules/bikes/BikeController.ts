import { Request, Response } from "express";
import ZodBikeSchema from "../validators/ZodBikeSchema";
import { BikeServices } from "./BikeServices";



const createBike = async (req: Request, res: Response) => {
    try {
        const { bike } = req.body     // assuming the object has a bike element which includes the bike object
        const ZodObject = ZodBikeSchema.parse(bike) // use validate for joi and parse for zod library.
        console.log(ZodObject)
    } catch (error) {
        console.log(error)
    }
}
const getABike = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.productId
        console.log('PARAM-',req.params)
        const result = await BikeServices.getOne(id)
        res.json({
            success:true,
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}
const getAllBikes = async (req: Request, res: Response) => {
    try {
        const result = await BikeServices.getAll()
        console.log(result)
        res.json({success:true, data:result})
    } catch (error) {
        console.log(error)
    }
}
const updateABike = async (req: Request, res: Response) => {
    try {
        const result = await BikeServices.updateOne()
        res.json({success:true, data:result})

    } catch (error) {
        console.log(error)
    }
}
const deleteABike = async (req: Request, res: Response) => {
    try {
        //const result= await BikeServices.getAll()
        //res.json({success:true, data:result})
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