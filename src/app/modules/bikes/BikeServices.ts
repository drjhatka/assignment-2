import mongoose from 'mongoose';
import { BikeModel } from './BikeSchema';
//define CRUD operations on the bikes (products) here

//start with GPUD order...

const create=async (bike:Bike)=>{return await BikeModel.create(bike)}
const getOne = async(Id:string)=>{
    console.log(Id)
    return await BikeModel.find({_id: new mongoose.Types.ObjectId(Id)})
}
//const getAll = async ()=>{return await BikeModel.find({})}
const updateOne = async ()=>{return {success:true}}
const deleteOne = async ()=>{return {success:true}}

export const BikeServices ={
    create,
    getOne,
    //getAll,
    updateOne,
    deleteOne
}