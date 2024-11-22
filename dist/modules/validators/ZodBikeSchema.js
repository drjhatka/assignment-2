"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// creating a schema for bike validation
const ZodBikeSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, 'Name is required') // Ensures the string is not empty
        .trim(),
    brand: zod_1.z
        .string()
        .min(1, 'Brand is required') // Ensures the string is not empty
        .trim(),
    price: zod_1.z
        .number()
        .min(0, 'Price cannot be negative or zero'), // Ensures price is not negative
    category: zod_1.z.enum(['Mountain', 'Road', 'Hybrid', 'Electric']),
    description: zod_1.z
        .string()
        .min(1, 'Description is required') // Ensures the string is not empty
        .max(300, 'Description cannot be more than 300 characters')
        .trim(),
    quantity: zod_1.z
        .number()
        .min(1, 'Quantity must be at least 1'), // Ensures quantity is at least 1
    inStock: zod_1.z.boolean().default(true) // Default to true if not provided
});
exports.default = ZodBikeSchema;
