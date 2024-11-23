"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// creating a schema for bike validation
const ZodOrderSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1, 'Email is required').trim(), // Ensures the string is not empty,
    productId: zod_1.z.string().trim(),
    quantity: zod_1.z.number().min(0, 'Quantity cannot negative or zero'), // Ensures price is not negative
    totalPrice: zod_1.z.number().min(0, 'Total Price cannot negative or zero'),
});
exports.default = ZodOrderSchema;
