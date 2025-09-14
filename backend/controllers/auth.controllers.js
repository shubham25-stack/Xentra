import { StrictMode } from "react";
import getToken from "../config/token";
import User from "../models/user.model";
import bcrypt from "bcryptjs";

export const signUp = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const existEmail = await User.findOne({email})
        if (existEmail) {
            return res.status(400).json({message:"Email already exists"})
        }
        if(password.length <6){
            return res.status(400).json({message:"Password must be at least 6 characters"})
        }

        const hashPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashPassword})

        const token = await getToken (user._id)
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        }) //for 1 weeks
        res.status(201).json({message:"User created successfully",user})
    } catch (error) {

    }
        
}