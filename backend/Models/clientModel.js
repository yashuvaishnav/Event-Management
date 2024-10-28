const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const clientSchema = mongoose.Schema(
  {
    name: { type: String},
    companyName: { type: String},
    contact: { type: Number},
    email: { type: String},
    designation : { type: String},
    companyType: { type: String},
  },
  {
    versionKey: false,
  }
);

const ClientModel = mongoose.model("client", clientSchema);
module.exports = { ClientModel };

// const mongoose = require("mongoose");
// mongoose.set("strictQuery", true);

// const clientSchema = mongoose.Schema(
//   {
//     name: { type: String},
//     lastName : { type: String},
//     companyName: { type: String},
//     contact: { type: Number},
//     email: { type: String},
//     companySize : { type: String},
//     companyType: { type: String},
//     designation : { type: String},
//   },
//   {
//     versionKey: false,
//   }
// );

// const ClientModel = mongoose.model("client", clientSchema);
// module.exports = { ClientModel };



