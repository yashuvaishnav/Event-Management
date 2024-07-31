
const express=require("express");
const {EventModel} = require("../Models/eventModel")
const eventRouter = express.Router();

eventRouter.get("/",async(req,res)=>{
    try {
        let events = await EventModel.find()
        res.send(events)
    } catch (error) {
        res.send({msg:"Events not found"})
    }
})

eventRouter.get("/:id",async(req,res)=>{
  const id =req.params.id
  try {
      let events = await EventModel.findById(id)
      res.send(events)
  } catch (error) {
      res.send({msg:"Events not found"})
  }
})

eventRouter.post("/event", async (req, res) => {
    try {
      let newEvent = new EventModel(req.body);
      await newEvent.save();
      res.status(200).send({ msg: "Event Added Successfully", event: newEvent });
    } catch (err) {
      res.status(400).send({ msg: "Not Added Event", error: err.message });
    }
  });

module.exports = {eventRouter}
