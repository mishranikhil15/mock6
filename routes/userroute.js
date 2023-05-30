const express=require("express");
const { UserModel}=require("../models/userModel")
const userrouter=express.Router();

const jwt=require('jsonwebtoken');

const bcrypt=require("bcrypt");

require('dotenv').config();


userrouter.get("/",async(req,res)=>{
    try {
        let data=await UserModel.find();
        res.json({"msg":data})
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error While Finding the User"})
    }
})

userrouter.post("/register",async(req,res)=>{

    const {name,email,password}=req.body;

    const find_email= await UserModel.find({email});
    console.log(find_email);
    if(find_email.length!=0){
        res.json({"msg":"Email Id Already Exists"})
        return
    }
    try {
        bcrypt.hash(password,5, async (err, hashed_password)=> {
            if(err){
                console.log(err)
            }else{
                let data=new UserModel({name,email,password:hashed_password});
                await data.save();
                res.status(201).json({"msg":"Successfully registered"})
            }
        });
        
    } catch (error) {
       console.log(error);
       res.json({"msg":"Error while registering the user"}) 
    }
})



userrouter.post("/login",async(req,res)=>{
    const{email,password}=req.body;

    const find_email=await UserModel.find({email});
    const hashed_password=find_email[0].password

    try {
        if(find_email.length>0){
            bcrypt.compare(password,hashed_password,(err, result)=> {
                if(result){
                    const token=jwt.sign({UserID:find_email[0]._id},process.env.key)
                    // console.log(token);
                    res.status(201).json({"msg":"Succesfully Logged In","token":token})
                }else{
                    res.json({"msg":"wrong credentials"})
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error While Logging the User"})
    }
})



module.exports={
    userrouter
}


// {
//     "name":"nikhil",
//     "email":"nikhil@gmail.com",
//     "password":"nikhil"
//   }