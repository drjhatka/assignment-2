import express, { Application } from 'express'
import cors from 'cors'
import main from './server'
import { BikeRoutes } from './modules/bikes/BikeRoutes'

//set up server configurations...
const app: Application = express()
app.use(express.json()) //use json perser
app.use(cors())

// call application routes....
app.use('/', BikeRoutes.router) //use the bike routes defined in the bike router
main()
export default app;
