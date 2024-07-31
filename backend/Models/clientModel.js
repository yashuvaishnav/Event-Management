const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const clientSchema = mongoose.Schema(
  {
    name: { type: String},
    companyName: { type: String},
    contact: { type: Number},
    email: { type: String},
    companySize : { type: Number},
    companyType: { type: String},
  },
  {
    versionKey: false,
  }
);

const ClientModel = mongoose.model("client", clientSchema);
module.exports = { ClientModel };
