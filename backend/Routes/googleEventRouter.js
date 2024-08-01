const express = require("express");
const googleRouter = express.Router();
const { GoogleEventModel } = require("../Models/googleEventModel");

googleRouter.get("/", async (req, res) => {
  try {
    let events = await GoogleEventModel.find();
    res.send(events);
  } catch (error) {
    res.send({ msg: "Events not found" });
  }
});

googleRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const googleEventData = await GoogleEventModel.findOne({ _id: id });
    res.status(200).send(googleEventData);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

googleRouter.post("/googleEvent", async (req, res) => {
  try {
    let googleEvent = new GoogleEventModel(req.body);
    await googleEvent.save();
    res
      .status(200)
      .send({ msg: "Event Created Successfully", event: googleEvent });
  } catch (err) {
    res.status(400).send({ msg: "Not Added Feedback", error: err.message });
  }
});

googleRouter.patch("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await GoogleEventModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
googleRouter.delete("/delete/:id",async(req,res)=>{
  try {
    const id = req.params.id;
    const res = await GoogleEventModel.findByIdAndDelete({_id : id});
    res.send({ msg: "Event deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})

module.exports = { googleRouter };
