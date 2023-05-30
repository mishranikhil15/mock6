
const express=require('express');

const {BookingModel}=require("../models/bookingModel");

const { authentication}=require("../middlewares/authentication");

const bookingrouter=express.Router();


bookingrouter.post("/booking/:id", authentication, async(req,res)=>{
const flight_id=req.params.id;
const user_id=req.body.UserID; 
console.log(flight_id,user_id);

let obj={
    user:user_id,
    
}


try {

    let data=await BookingModel.findOne(obj);
    console.log(data)

    

    
} catch (error) {
    console.log(error);
    res.json({"msg":"error while finding the user and flight"})
}
})

module.exports={
    bookingrouter
}

