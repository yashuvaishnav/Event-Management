const mongoose = require("mongoose");

const googleEventSchema = mongoose.Schema(
  {
    kind: { type: String, default : "calander#event" },
    key:{ type: String},
    summary : { type: String },
    description : { type: String },
    keynoteSpeaker: { type: String },
    participantsLimit: { type: Number },
    imageUrl: { type: String },
    location: { type: String },
    start: {type: String},
    end: {type: String},
    timeZone: { type: String, default: "Asia/Kolkata"},
    attendees: [
      {
        email: { type: String},
        responseStatus: { type: String, default: "needsAction" },
        attendance : { type: Boolean, default: false },
        name : { type: String},
        contact : {type: Number},
      }
    ],
    organizedBy: { type: String },
    recurrence: { type : [String], default : ["RRULE:FREQ=DAILY;COUNT=1"] },
    reminders: {
      useDefault: { type: Boolean,default: true  },
    },
    guestsCanSeeOtherGuests: { type: Boolean, default: true },
    accessToken: { type: String },
    foodArrangements: { type: [String] },
    supportPerson: [
      {
        name: { type: String },
        task: { type: String }
      }
    ],
    equipmentList: { type: [String] }
  },
  {
    versionKey: false
  }
);

const GoogleEventModel = mongoose.model("GoogleEvent", googleEventSchema);
module.exports = { GoogleEventModel };





// const mongoose = require("mongoose");
// const googleEventSchema = mongoose.Schema(
//   {
//     kind: { type: String },
//     key:{ type: String},
//     eventTitle: { type: String },
//     summary : { type: String },
//     description : { type: String },
//     text: { type: String},
//     location: { type: String },
//     details:{ type: String },
//     start: {
//       dateTime: { type: String },  // Adjust type based on actual data (Date, String, etc.)
//       timeZone: { type: String, default: "UTC" }
//     },
//     end: {
//       dateTime: { type: String },  // Adjust type based on actual data (Date, String, etc.)
//       timeZone: { type: String, default: "UTC" }
//     },
//     timeZone: { type: String, default: "UTC"},
//     attendees: [
//       {
//         email: { type: String},
//         responseStatus: { type: String, default: "needsAction" }
//       }
//     ],
//     organizedBy: { type: String },
//     recurrence: { type: [String] },
//     reminders: {
//       useDefault: { type: Boolean,default: false  },
//     },
//     guestsCanSeeOtherGuests: { type: Boolean, default: false },
//     accessToken: { type: String },
//     foodArrangements: { type: [String] },
//     supportPerson: [
//       {
//         name: { type: String },
//         task: { type: String }
//       }
//     ],
//     equipmentList: { type: [String] }
//   },
//   {
//     versionKey: false
//   }
// );

// const GoogleEventModel = mongoose.model("GoogleEvent", googleEventSchema);
// module.exports = { GoogleEventModel };
