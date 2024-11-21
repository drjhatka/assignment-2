"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = __importDefault(require("./server"));
//set up server configurations...
const app = (0, express_1.default)();
app.use(express_1.default.json()); //use json perser
app.use((0, cors_1.default)());
// call application routes....
(0, server_1.default)();
exports.default = app;
