import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    brand: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: [0,'Price Cannot be negative or zero']
    },
    category: {
        type: String,
        required: true,
        enum: ['Mountain', 'Road', 'Hybrid', 'Electric']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        max:[300,'description cannot be more than 300 characters.']
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    inStock: {
        type: Boolean,
        required: true,
        default:true
    }
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

export default bikeSchema;
