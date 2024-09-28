import express from 'express'
import bodyParser from 'express'
import mongoose from 'mongoose'
import userRouter from './routes/User.js'
import contactRouter from './routes/Contact.js'
import {config} from 'dotenv'
import cors from 'cors'


const app = express();
app.use(bodyParser.json())

// .env setup
config({path:'.env'})

// cors
app.use(cors({
    origin: true,
    methods: ["POST", "GET", "PUT", "DELETE "],
    credentials: true
}))

// mongodb setup
mongoose.connect(process.env.MongoUrl,
    {
        dbName: "Contact_API"
    }).then(() => console.log("mongoDB connected")).catch((err) => console.log(err));


// user router
app.use('/api/user', userRouter)  // basically isme hame 'prefix de rahe hai'..

// contact router
app.use('/api/contact', contactRouter)


const port = 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));