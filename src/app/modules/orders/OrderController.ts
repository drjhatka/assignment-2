import { Request, Response } from "express";
import { ZodError } from "zod";
import ZodOrderSchema from "../validators/ZodOrderSchema";
import { fireCustomBikeResponse } from "../utilities/CustomResponse";
import { BikeServices } from "../bikes/BikeServices";


const createOrder = async (req: Request, res: Response) => {
    try {
        const { order } = req.body     // assuming the object has a order element which includes the order object
        //validate with Zod ...
        ZodOrderSchema.parse(order) // use validate for joi and parse for zod library.
        //fetch bike related to order...
        const bike = await BikeServices.getOne(order.productId)
        //check if the quantity is available for the specified product...
        if (bike.quantity < order.quantity && (order.quantity - bike.quantity) != 0) {
            fireCustomBikeResponse(res, 400, false, 'Order Quantity cannot be more than currently available stock', order)
        }
        //set the inStock method to false...
        else if ((order.quantity - bike.quantity) == 0) {
            bike.inStock = false;
        }
        else {
            //otherwise store in DB...
            bike.quantity = bike.quantity - order.quantity;
            BikeServices.updateOne('bike._id', bike)
            fireCustomBikeResponse(res, 200, false, 'Stock Updated', bike)
        }
    } catch (error) {
        if (error instanceof ZodError) {
            res.send({ errors: error.issues, stackTrace: error.stack })
        }
        console.log(error)
    }
}

export const OrderController = {
    createOrder,
}