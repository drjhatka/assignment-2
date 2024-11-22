import express, { Application } from 'express'
import cors from 'cors'
import { BikeRoutes } from './app/modules/bikes/BikeRoutes'
import notFoundHandler from './app/modules/errors/RouteUnavailable'

//set up server configurations...
const app: Application = express()
app.use(express.json()) //use json perser
app.use(cors())


// call application routes....
app.use('/', BikeRoutes.router) //use the bike routes defined in the bike router


//use middleware
app.use(notFoundHandler)

export default app;


