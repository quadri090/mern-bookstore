import express from 'express'; //npm i express
import { PORT } from './config.js';
import mongoose from 'mongoose'; //npm i mongoose
import booksRoute from './routes/booksRoute.js';
import cors from 'cors' //npm i cors
import "dotenv/config";//npm i dotenv --save

 
const app = express()

//middleware for parsing request body
app.use(express.json())


//Middleware for handling cors policy
app.use(cors()) //This option alllows all origin with default cors(*), where the asterik means all

// app.use(cors({
//     origin: 'https://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))

//route to home page /
app.get('/', (req, res) => {
    res.status(200).send(`MERN stack tutorial running on port: ${PORT}`);
})

//getting all routes and methods from the booksRoute route file
app.use('/books', booksRoute)


mongoose
    .connect(process.env.MONGODBURL)
    .then(() => {
        console.log('App is connected to database');
        app.listen(PORT, () => {
            console.log(`server is running on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    })