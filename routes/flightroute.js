
const express=require('express');

const { FlightModel}=require("../models/flightModel");

const { authentication}=require("../middlewares/authentication")

const flightrouter=express.Router();


flightrouter.get("/flights",async(req,res)=>{
    try {
        let data=await FlightModel.find();
        res.status(200).json({"msg":"All flight Data","flight_data":data})
    } catch (error) {
        console.log(error);
        res.json({"msg":"Cannot get flight data"})
    }
})

flightrouter.get("/flights/:id",async(req,res)=>{
    let id=req.params.id
    try {
        let data=await FlightModel.find({_id:id});
        res.status(200).json({"msg":"All flight Data","flight_data":data})
    } catch (error) {
        console.log(error);
        res.json({"msg":"Cannot get flight data"})
    }
})

flightrouter.post("/flights",authentication,async(req,res)=>{

    let payload=req.body
    try {
        let data=new FlightModel(payload);
        await data.save();
        res.json({"msg":"Added new flight data"})
        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error while posting the flights"})
    }
})


flightrouter.patch("/flights/:id",authentication,  async(req,res)=>{

    const payload=req.body;
    const id=req.params.id; 

    try {
        const flight_data=await FlightModel.findByIdAndUpdate({_id:id},payload,{new:true});
        console.log(flight_data);
        res.json({"msg":"updated_flight_data","flight_data":flight_data})
        
        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error While Updating the data"})
    }
})



flightrouter.delete("/flights/:id",authentication,  async(req,res)=>{

    const payload=req.body;
    const id=req.params.id; 

    try {
        const flight_data=await FlightModel.findByIdAndDelete({_id:id},{new:true});
        // console.log(flight_data);
        res.status(202).json({"msg":"Deleted_flight_data"})
        
        
    } catch (error) {
        console.log(error);
        res.json({"msg":"Error While Updating the data"})
    }
})


module.exports={
    flightrouter
}


// {
//     "airline": "air",
//      "flightNo": "1",
//      "departure": "2p.m",
//      "arrival": "4p.m",
//      "departureTime": "2023-06-22",
//      "arrivalTime": "2023-06-26",
//      "seats": 100,
//      "price": 1000
 
//  }