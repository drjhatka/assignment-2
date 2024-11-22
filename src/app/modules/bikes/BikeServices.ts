import mongoose from 'mongoose';
import { BikeModel } from './BikeSchema';
//define CRUD operations on the bikes (products) here

//start with GPUD order...

const create = async (bike: Bike) => { return await BikeModel.create(bike) }

const getOne = async (Id: string) => {return await BikeModel.find({ _id: new mongoose.Types.ObjectId(Id) })}

const getAll = async (searchTerm: string) => {
    // build a search condition...
    let filter = {};
    let result = null;
    if (searchTerm) {
        const regex = new RegExp(searchTerm, 'i'); // Case-insensitive search
        filter = {
            $or: [{ name: regex }, { brand: regex }, { category: regex }]
        };
        result = await BikeModel.find(filter)
    }
    return result
}
const updateOne = async () => { return { success: true } }
const deleteOne = async () => { return { success: true } }

export const BikeServices = {
    create,
    getOne,
    getAll,
    updateOne,
    deleteOne
}