import mongoose from "mongoose";
import { configs } from "./app/config";
import app from "./app";

async function serverListen () {
    try {
        await mongoose.connect(configs.dbURL as string)
        app.listen(configs.port, () => console.log(`Server is listening on port ${configs.port}`))
    } catch (err) {
        console.log(err)
    }
}
serverListen()




