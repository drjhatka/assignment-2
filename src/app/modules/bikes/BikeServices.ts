import { BikeModel } from './BikeSchema';
//define CRUD operations on the bikes (products) here

//start with GPUD order...

const create=async (bike:Bike)=>{return await BikeModel.create(bike)}
const getOne = async()=>{return await BikeModel.find({})}
const getAll = async (Id:number)=>{BikeModel.find({id:Id})}
const updateOne = async (Id:number)=>{}
const deleteOne = async (Id:number)=>{}

export const BikeServices ={
    create,
    getOne,
    getAll,
    updateOne,
    deleteOne
}