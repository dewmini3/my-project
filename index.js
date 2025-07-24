import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import studentRouter from "./routers/studentRouters.js";
import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken"



const app=express();

app.use(bodyParser.json())

app.use(
   (req,res,next)=>   {
     const value = req.header("Authorization")
        
      if(value != null){
        //remove baerer
      const token = value.replace("Baerer ","")
     //decript
      jwt.verify(token,"cbc-6503",(err,decoded)=>
        {
            if(decoded == null){
                res.status(403).json(
               {
                message:"Unathorized"
               }
               )
            }else{
                req.user = decoded
                next()
            }
       }
    )
 }else{
      next()
    }
   }
) 
/*const connectionString="mongodb+srv://admin1234:mongodb+srv://admin1234:<db_password>@cluster0.flss0wy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0mongodb+srv://admin1234:1234#56@cluster0.flss0wy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0@cluster0.flss0wy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"


mongoose.connect(connectionString).then(()=>{
    console.log("Database Connection")
}).catch(()=>{
    console.log("failed to connect database")
})*/

        app.use("/students",studentRouter)
        app.use("/users",userRouter)

app.listen(5000, ()=>{
    console.log("Server is running on port 5000");
})









