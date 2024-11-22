import { BikeModel } from './BikeSchema';
//define CRUD operations on the bikes (products) here

//start with GPUD order...

const create=async (bike:Bike)=>{return await BikeModel.create(bike)}
const getOne = async(Id:string)=>{return await BikeModel.find({id:Id})}
const getAll = async ()=>{BikeModel.find({})}
const updateOne = async (Id:string)=>{}
const deleteOne = async (Id:string)=>{}

export const BikeServices ={
    create,
    getOne,
    getAll,
    updateOne,
    deleteOne
}