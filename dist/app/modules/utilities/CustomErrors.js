"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const fireCustomError = (res, httpCode, success, message, stackTrace) => {
    res.status(httpCode).json({ success, message, stackTrace });
};
exports.CustomError = { fireCustomError };
