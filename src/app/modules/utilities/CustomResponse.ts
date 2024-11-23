import { Response } from "express"


const fireCustomResponse=(res:Response,httpCode:number, success:boolean, message:string, data?:Bike)=>{
    res.status(httpCode).json({success,message, data })
}

export const CustomResponse ={fireCustomResponse}