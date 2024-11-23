import mongoose from "mongoose"
import Order from './OrderInterface';
import {OrderModel} from "./OrderSchema"

const create = async (order: Order) => { return await OrderModel.create(order) }

const getOne = async (productId: string) => { return await OrderModel.find({ productId: new mongoose.Types.ObjectId(productId) }) }

const getAll = async () => {return await OrderModel.find({})}


export const OrderServices ={
    create,
    getOne,
    getAll
}