import express, { Application } from 'express'
import cors from 'cors'
import main from './server'

//set up server configurations...
const app: Application = express()
app.use(express.json()) //use json perser
app.use(cors())


// call application routes....
main()
export default app;
