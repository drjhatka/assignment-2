import { Request, Response, NextFunction } from "express"
export function noEmptyCreate (req:Request, res:Response, next:NextFunction){
    if(Object.keys(req.body).length==0){
        res.json({success:false, message:"Empty Objects are not allowed for POST request"})
    }
    next()
}