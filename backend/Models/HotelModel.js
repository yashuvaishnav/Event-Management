
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const hotelSchema = mongoose.Schema(
  {
    hotelName: { type: String},
    hotelAddress: { type: String},
    managerName: { type: String},
    managerContact: { type: Number},
    pricePerPlate : { type: Number},
  },
  {
    versionKey: false,
  }
);

const HotelModel = mongoose.model("hotel", hotelSchema);
module.exports = { HotelModel };
