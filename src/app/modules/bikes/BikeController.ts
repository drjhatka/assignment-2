import { Request, Response } from "express";
import ZodBikeSchema from "../validators/ZodBikeSchema";
import { BikeServices } from "./BikeServices";
import { ZodError } from "zod";



const createBike = async (req: Request, res: Response) => {
    try {
        console.log('post hit')
        const bike = req.body     // assuming the object has a bike element which includes the bike object
        const document = ZodBikeSchema.parse(bike) // use validate for joi and parse for zod library.
        //save into database
        const result = await BikeServices.create(bike)
        res.status(200).json({
            success:true,
            message:"Bike Created Successfully",
            data:document
        })
    } catch (error) {
        if (error instanceof ZodError) {
            res.send({errors:error.issues, stackTrace:error.stack})
        }
        console.log(error)

    }
}
const getABike = async (req: Request, res: Response) => {
    try {
        const id: string = req.params.productId
        const result = await BikeServices.getOne(id)
        res.json({
            success: true,
            data: result
        })
    } catch (error) {
        res.json({ success: false, message: "Something went wrong" })
        console.log(error)
    }
}
const getAllBikes = async (req: Request, res: Response) => {
    try {
        console.log(req.query.searchTerm)
        const result = await BikeServices.getAll(req.query.searchTerm as string)
        if(result?.length!=0){
            res.status(200).json({
                message:"Bike Retrieved Successfully",
                status:true,
                data:result
            })
        }
        res.json({ success:false, message:"Bike not available" })
    } catch (error) {
        console.log(error)
    }
}
const updateABike = async (req: Request, res: Response) => {
    try {
        const result = await BikeServices.updateOne()
        res.json({ success: true, data: result })

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