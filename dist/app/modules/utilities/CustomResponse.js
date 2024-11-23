"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomResponse = void 0;
const fireCustomResponse = (res, httpCode, success, message, data) => {
    return res.status(httpCode).json({ success, message, data });
};
exports.CustomResponse = { fireCustomResponse };
