import { Request, Response } from "express";
import { ZodError } from "zod";
import ZodOrderSchema from "../validators/ZodOrderSchema";
import { BikeServices } from "../bikes/BikeServices";
import { CustomResponse } from '../utilities/CustomResponse';
import { CustomError } from "../utilities/CustomErrors";


const createOrder = async (req: Request, res: Response) => {
    try {
        const { order } = req.body     // assuming the object has a order element which includes the order object
        //validate with Zod ...
        ZodOrderSchema.parse(order) // use validate for joi and parse for zod library.
        //fetch bike related to order...
        const bike = await BikeServices.getOne(order.productId)
        //check if the quantity is available for the specified product...
        if (bike.quantity < order.quantity && (order.quantity - bike.quantity) != 0) {
            CustomResponse.fireCustomResponse(res, 400, false, 'Order Quantity cannot be more than currently available stock', order)
        }
        //set the inStock method to false...
        else if ((order.quantity - bike.quantity) == 0) {
            bike.inStock = false;
            BikeServices.updateOne('bike._id', bike)
            CustomResponse.fireCustomResponse(res, 200, true, 'Order Created Successfully', order)
        }
        else {
            //otherwise store in DB...
            bike.quantity = bike.quantity - order.quantity;
            BikeServices.updateOne('bike._id', bike)
            CustomResponse.fireCustomResponse(res, 200, false, 'Product Stock Updated', order)
        }
    } catch (error) {
        if (error instanceof ZodError) {
            CustomError.fireCustomError(res,400,false,error.issues, error.stack?.toString())
        }
        console.log(error)
    }
}

export const OrderController = {
    createOrder,
}