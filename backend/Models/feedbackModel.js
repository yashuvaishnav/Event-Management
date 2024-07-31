
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const feedbackSchema = mongoose.Schema(
  {
    clientName: { type: String, required: true },
    companyName: { type: String, required: true},
    email: { type: String, required: true},
    remarks: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const FeedbackModel = mongoose.model("feedback", feedbackSchema);
module.exports = { FeedbackModel };
