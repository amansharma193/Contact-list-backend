import dotenv from 'dotenv';
import express from 'express';
import mongoose  from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import contactRoutes from './routes/contact.js';


const app= express();
// for getting values from env file
dotenv.config({path:"./.env"});

// for incoming json data
app.use(bodyParser.json({limit:"10mb",extended:true}));

// for urlencoded data
app.use(bodyParser.urlencoded({limit:"10mb",extended:true}));
// for resolving cors error
app.use(cors());

// for heroku provided port otherwise 5000
const PORT=process.env.PORT || 5000;
// getting connection url form env
const CONNECTION_URL=process.env.CONNECTION_URL;

// adding contact router
app.use('/contact',contactRoutes);

// base api
app.get('/',(req,res)=>{
  res.send('Welcome to Contact list api');
})


// starting mongoose connection
mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
          // starting server
.then(()=>app.listen(PORT,()=>console.log(`Server started at port: ${PORT}`)))
            // in case of any error 
.catch((err)=>console.log("Got error",err));






console.log(process.env.CONNECTION_URL);
