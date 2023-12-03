import User from "../models/user.model.js"
import bcyrpt from 'bcryptjs'
import { errorHandler } from "../util/error.js";
import  jwt  from "jsonwebtoken";

export const signup = async (req,res,next)=>{
   const{username,email,password} = req.body
   const hashPassword = bcyrpt.hashSync(password,10);
   const newUser = new User({
       username,
       email,
       password:hashPassword
  })

   try {

   await newUser.save()
   res.status(201).json({message:"User created successfully"})
    
   } catch (error) {
        next(error)
   }
  
}
export const signin = async (req,res,next)=>{
     const {password,email} = req.body
     try {
          const validUser = await User.findOne({email})
          if(!validUser) return next(errorHandler(401,"User not found!"))
          const valiPassword = bcyrpt.compareSync(password,validUser.password)
          if(!valiPassword) return next(errorHandler(401,"Invalid Password!"))
          const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET)
          const{password:hashPassword, ...rest} = validUser._doc
          const expiryDate = new Date(Date.now() + 3600000); //1hour
          res.cookie('access_token',token,{httpOnly: true, expires:expiryDate}).status(200).json(rest)
     } catch (error) {
          next(error)
     }
}


export const google = async (req,res,next)=>{
     const {name,email,photo} = req.body
     try {
          const user = await User.findOne({email})
          if(user){
               const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
               const {password:hashPassword, ...rest} = user._doc
               const expiryDate = new Date(Date.now() + 3600000); //1hour
               res.cookie('access_token',token,{httpOnly: true, expires:expiryDate}).status(200).json(rest)
          }else{
               const generatedPassword = Math.random().toString(36).slice(-8)
               const hashPassword = bcyrpt.hashSync(generatedPassword,10)
               const newUser = newUser({
                    username:
                    name.split(' ').join("").toLowerCase()+Math.floor(Math.random * 1000).toString(),
                    password:hashPassword,
                    profilePhoto:photo
               })
               await newUser.save()
               const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET)
               const {password:hashPassword2, ...rest} = user._doc;
               const expiryDate = new Date(Date.now() + 3600000); //1hour
               res.cookie('access_token',token,{httpOnly: true, expires:expiryDate}).status(200).json(rest)
          }
       
     } catch (error) {
          next(error)
     }
}