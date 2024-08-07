const express = require("express");
const googleRouter = express.Router();
const { GoogleEventModel } = require("../Models/googleEventModel");

googleRouter.get("/", async (req, res) => {
  try {
    let query = {};
    if (req.query.searchQuery) {
      query = {
        $or: [
          { name: { $regex: req.query.searchQuery, $options: "i" } },
          { email: { $regex: req.query.searchQuery, $options: "i" } },
        ],
      };
    }
    let events = await GoogleEventModel.find(query);
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

googleRouter.patch("/attendance/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { attendance, client } = req.body;

    let result = await GoogleEventModel.findOne({ _id: id });
    if (result) {
      const clientAttandance = result.attendees.filter((att) => {
        const objectId = att._id;
        const stringId = objectId.toHexString();
        if (stringId === client._id) {
          return att;
        }
      });
      if (clientAttandance) {
        clientAttandance[0].attendance = attendance;
        await result.save();
        res.status(200).send({msg : "Update Attendance Successfully",result:result});
      } else {
        res.status(400).send({ msg: "Attendee not found" });
      }
    } else {
      res.status(400).send({ msg: "Event not found" });
    }
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
});

googleRouter.patch("/attendees/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const attendees = req.body;
    const options = { new: true };

    const result = await GoogleEventModel.findByIdAndUpdate(
      id,
      attendees,
      options
    );
    if (result) {
      res.status(200).send({ msg: "update attendees successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

googleRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await GoogleEventModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.status(200).send({ msg: "Event updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

googleRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await GoogleEventModel.findByIdAndDelete(id);
    if (result) {
      res.send({ msg: "Event deleted successfully" });
    } else {
      res.status(404).send({ msg: "Event not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { googleRouter };
