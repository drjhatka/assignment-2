"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
//configure node path for app config file....
dotenv_1.default.config({ path: path_1.default.join('./' + '.env') });
//broadcast env vars...
exports.configs = {
    port: process.env.DB_PORT,
    dbURL: process.env.DB_URL
};
