import dotenv from 'dotenv'
import path from 'path'

//configure node path for app config file....
dotenv.config({path:path.join('./'+'.env')})

//broadcast env vars...
export const configs= {
    port:process.env.DB_PORT,
    dbURL :process.env.DB_URL
}