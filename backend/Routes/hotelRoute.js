
const express=require("express");
const { HotelModel } = require("../Models/HotelModel");
const hotelRouter = express.Router();

hotelRouter.get("/",async(req,res)=>{
    try {
        let Hotels = await HotelModel.find()
        res.status(200).send(Hotels)
    } catch (error) {
        res.status(404).send({"msg":"Hotels not found"})
    }
})

hotelRouter.post("/addHotel", async (req, res) => {
    try {
      let newHotel = new HotelModel(req.body);
      await newHotel.save(); 
      res.status(200).send({ msg: "Hotel Added Successfully" });
    } catch (err) {
      res.status(400).send({ msg: "Not Added Hotel", error: err.message });
    }
  });

module.exports = {hotelRouter}