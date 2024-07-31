const express = require("express");
const { ClientForEventModel } = require("../Models/clientForEventModel");
const clientForEventRouter = express.Router();

clientForEventRouter.get("/", async (req, res) => {
  try {
    let clientForEvent = await ClientForEventModel.find();
    res.send(clientForEvent);
  } catch (error) {
    res.send({ msg: "Client For Event not found" });
  }
});
clientForEventRouter.put("/attendance/:id", async (req, res) => {
  try {
    const id = req.params.id;
    let {attendance} = req.body;

    let result = await ClientForEventModel.findOne({_id:id})
    if(result){
      result.attendance = attendance
    } 
     await result.save()
     res.status(200).send(result);
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }

});

clientForEventRouter.post("/eventRegistration", async (req, res) => {
  let obj = req.body;
  if (!/^\d{10}$/.test(obj.contact)) {
    return res.status(200).send({
      msg: "Contact number must contain exactly 10 digits",
    });
  }
  try {
    let newClientForEvent = new ClientForEventModel(obj);
    await newClientForEvent.save();
    res
      .status(200)
      .send({
        msg: "Event Registered Successfully",
        client: newClientForEvent,
      });
  } catch (err) {
    res
      .status(400)
      .send({ msg: "Not Registered Event", error: err.message });
  }
});

module.exports = { clientForEventRouter };
