import { findByMail,appendUser } from "../models/usermodel.js"

import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
export const addUser = async(req,res)=>{
const {email,password,username}= req.body
// console.log(email, password, username);

    
     try{
        let result  = await findByMail(email)
        
        let hashPassword = await bcrypt.hash(password, 10);
        if(result){
           return res.status(400).json({
                message:'email already exits'
            })
        }
        await appendUser(username,hashPassword,email)
        res.status(201).json({
            message:'data stored successfully'
        })
     }catch(error){
     res.status(500).json({
        error:error.message
     })
     }
}

export const login = async(req,res)=>{
    const {email,password} =req.body
    try{
        const user = await findByMail(email);
        if (!user) {
            return res.status(404).json({ 
                message: "User not found" 
            })}
            let pass = await bcrypt.compare(password,user.password)
            if(!pass){
                return res.status(404).json({
                    message:"invalid password"
                })
            }
            const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET,{ expiresIn: '1d' })
            res.status(200).json({
                message:"user login successful",
                token:token
            })
        }catch(error){
            res.status(500).json({
                error:error.message
            })
        }
    }
