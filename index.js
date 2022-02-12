import dotenv from 'dotenv';
import express from 'express';
import mongoose  from "mongoose";
import cors from 'cors';
import bodyParser from "body-parser";
import contactRoutes from './routes/contact.js';


const app= express();

dotenv.config({path:"./.env"});
app.use(bodyParser.json({limit:"10mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"10mb",extended:true}));
app.use(cors());


const PORT=process.env.PORT || 5000;
const CONNECTION_URL=process.env.CONNECTION_URL;

app.use('/contact',contactRoutes);

app.get('/',(req,res)=>{
  res.send('Welcome to Contact list api');
})

mongoose.connect(CONNECTION_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>app.listen(PORT,()=>console.log(`Server started at port: ${PORT}`)))
.catch((err)=>console.log("Got error",err));






console.log(process.env.CONNECTION_URL);
