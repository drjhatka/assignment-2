"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noEmptyCreate = noEmptyCreate;
function noEmptyCreate(req, res, next) {
    if (Object.keys(req.body).length == 0) {
        res.json({ success: false, message: "Empty Objects are not allowed for POST request" });
    }
    next();
}
