import dotenv from 'dotenv';
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { connectDb } from './config/connectdb.js'
import Authrouter from './routes/Auth.js'
import CokkieParser from 'cookie-parser'

const app = express()
const port = process.env.PORT || 3000
const dbURl = process.env.DBURL

// middlewares 

// Cors policy
app.use(cors())
// Body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// Cookie parser
app.use(CokkieParser())

// Routers 

app.use(Authrouter)




// db connection 
connectDb(dbURl)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))