const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const clientSuggestionSchema = mongoose.Schema(
  {
    clientName: { type: String, required: true },
    companyName: { type: String, required: true},
    toolName: { type: String, required: true},
    suggestion: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const ClientSuggestionModel = mongoose.model("clientSuggestion", clientSuggestionSchema);
module.exports = { ClientSuggestionModel };
