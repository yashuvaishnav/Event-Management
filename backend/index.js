const express = require("express");
const app = express();
const cors = require("cors");
const { connection } = require("./db");
const { adminRouter } = require("./Routes/adminRoute");
const { eventRouter } = require("./Routes/eventRoute");
const { clientSuggestionRouter } = require("./Routes/clientSuggestionRoute");
const { feedbackRouter } = require("./Routes/feedbackRoute");
const { clientRouter } = require("./Routes/clientRoute");
const { mailRouter } = require("./Mail/gmail");
const { clientForEventRouter } = require("./Routes/clientForEventsRouter");
const { googleRouter } = require("./Routes/googleEventRouter");
const { hotelRouter } = require("./Routes/hotelRoute");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/admin", adminRouter);
app.use("/events", eventRouter);
app.use("/clientsuggestions", clientSuggestionRouter);
app.use("/feedbacks", feedbackRouter);
app.use("/clients", clientRouter);
app.use("/clientForEvent", clientForEventRouter);
app.use("/mails", mailRouter);
app.use("/calender", googleRouter);
app.use("/hotel", hotelRouter);

app.get("/", (req, res) => {
  res.send("server is working");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("server is running at port 8080");
  } catch (err) {
    console.log("err", err);
    console.log("server error");
  }
});
