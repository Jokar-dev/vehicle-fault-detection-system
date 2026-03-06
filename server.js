const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/vehicleDB");

const vehicleSchema = new mongoose.Schema({
speed:Number,
temperature:Number,
battery:Number,
tire:Number,
alert:String,
time:String
});

const Vehicle = mongoose.model("Vehicle",vehicleSchema);

app.post("/data", async (req,res)=>{

const newData = new Vehicle(req.body);

await newData.save();

res.json({status:"saved"});

});

app.get("/history", async (req,res)=>{

const data = await Vehicle.find();

res.json(data);

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});