 import express from 'express';
 import mongoose from 'mongoose';
 import dotenv from "dotenv"



dotenv.config()

 mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("mongoDB Connected"))
    .catch((error)=>console.log(error.message))

 const app = express();

 app.listen(3000, ()=>{
    console.log("Server Listening on port 3000 ")
 })
 