const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);

const eventSchema = mongoose.Schema(
  {
    eventTitle: { type: String },
    venue: { type: String },
    date: { type: String },
    participantsLimit: { type: Number },
    organizedBy: { type: String },
    keynoteSpeaker: { type: String },
    imageUrl: { type: String },
    breakTime: { type: String },
    foodArrangements: { type: [String] },
    supportPerson: [
      {
        name: { type: String },
        task: { type: String },
      },
    ],
    equipmentList: { type: [String] },
  },
  {
    versionKey: false,
  }
);

const EventModel = mongoose.model("event", eventSchema);
module.exports = { EventModel };
