import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    email:{type:String, required:true},
    productId:{type:String},
    quantity:{type:Number},
    totalPrice:{type:Number}
})