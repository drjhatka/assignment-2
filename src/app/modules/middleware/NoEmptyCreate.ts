import { Request, Response, NextFunction } from "express"
export const noEmptyCreate =(req:Request, res:Response, next:NextFunction)=>{
    console.log( req.body)
}