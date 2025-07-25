
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function createUser(req,res){

    const passwordHash = bcrypt.hashSync(req.body.password,10)    
    const userData = {
                 firstName : req.body.firstName ,
                  lastName: req.body.lastName,
                  email: req.body.email,
                  password: passwordHash,
                  phone: req.body.phone,
             }
     const user = new User(userData)
         user.save().then(
            ()=>{
                res.json({
                    message : "user created successfully"
                })
            }
         ).catch(
            ()=>{
                res.json({
                    message: "failed to create user"
                })
            }
         )
   
}
export function loginUser(req,res)

 {
    const email= req.body.email
    const password= req.body.password

    user.findOne(
        {
        email : email
    }
     ).then(
        (user)=>{
           if(user == null){
              res.status(404).json({
                
                message: "User Not Found"

            })
            
           }else{
            const isPasswordCorrect = bcrypt.compareSync(password,user.password)
            if(isPasswordCorrect){

               const token = jwt.sign(
                {
                      email : user.email,
                      firstName: user.firstName,
                      lastName: user.lastName,
                      role: user.role,
                      isBlocked: user.isBlocked,
                      isEmailVerified: user.isEmailVerified,
                      image: user.image,

               },
               "cbc-6503"
            )
                
                res.json({
                    token : token,
                    message : "Login Successful"
                })
            }else{
                res.status(403).json({
                    message: "Incorrect Password"
                })
            
            }
           }
    })

 }
 export function isAdmin(req){

    if(req.user == null){
        return false;
    }
    if(req.user.role == "admin"){
        return true;

    }else{
        return false;
    }
 }
