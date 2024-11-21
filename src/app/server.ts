import app from "./app";
import { configs } from "./config";
import dotenv from 'dotenv'
import mongoose from "mongoose";
import path from 'path';

dotenv.config({ path: path.join('./' + '.env') })

async function main() {
    try {
        await mongoose.connect(configs.dbURL as string)
        app.listen(configs.port, () => console.log(`Server is listening on port ${configs.port}`))

    } catch (err) {
        console.log(err)
    }
}
export default main;
