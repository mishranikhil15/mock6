const express=require('express');

const {Connection}= require("./config/db");
const {userrouter}=require("./routes/userroute");
const {bookingrouter}=require("./routes/bookingroute")

const {flightrouter}=require("./routes/flightroute")
require('dotenv').config();
const app=express();


app.use(express.json());




app.get("/",(req,res)=>{
    res.send("welcome")
})

app.use("/users",userrouter);

app.use("/flight",flightrouter);

app.use("/book",bookingrouter);



app.listen(process.env.port,async()=>{
    try {

       await Connection 
       console.log(`Server is running on port ${process.env.port}`)
    } catch (error) {
        console.log(error);
        console.log(`Error While Connecting To Database`)
    }
  
})