import mongoose from 'mongoose';
import { BikeModel } from './BikeSchema';
//define CRUD operations on the bikes (products) here

//start with GPUD order...

const create = async (bike: Bike) => { return await BikeModel.create(bike) }

const getOne = async (Id: string) => { return await BikeModel.find({ _id: new mongoose.Types.ObjectId(Id) }) }

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
const updateOne = async (productId: string, updatedDoc:Bike) => {
    try{
        const result = await BikeModel.updateOne({ _id: new mongoose.Types.ObjectId(productId) }, {
            $set: updatedDoc // using bike interface type on updatedDoc doesn't allow extra fields to be added, but still shows a false flag of modified count
        })
        if(await result.modifiedCount===1 && result.matchedCount===1){return true}
        return false
    }catch(err){
        console.log('error', err)
    }
}
const deleteOne = async (productId:string) => { 
    const result = BikeModel.deleteOne({_id: new mongoose.Types.ObjectId(productId)})
    if((await result).deletedCount==1){
        return true
    }
    return false
 }

export const BikeServices = {
    create,
    getOne,
    getAll,
    updateOne,
    deleteOne
}