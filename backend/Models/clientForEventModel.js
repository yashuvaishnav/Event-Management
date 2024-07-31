
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const clientForEventSchema = mongoose.Schema(
  {
    eventId : { type: String},
    name: { type: String},
    companyName: { type: String},
    contact: { type: Number},
    email: { type: String},
    companySize : { type: Number},
    companyType: { type: String},
    attendance : { type: Boolean, default: false}
  },
  {
    versionKey: false,
  }
);

const ClientForEventModel = mongoose.model("clientForEvent", clientForEventSchema);
module.exports = { ClientForEventModel };
