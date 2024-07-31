
const express=require("express");
const {FeedbackModel} = require("../Models/feedbackModel")
const feedbackRouter = express.Router();

feedbackRouter.get("/",async(req,res)=>{
    try {
        let feedbacks = await FeedbackModel.find()
        res.status(200).send(feedbacks)
    } catch (error) {
        res.status(404).send({"msg":"Feedbacks not found"})
    }
})

feedbackRouter.post("/clientFeedback", async (req, res) => {
    try {
      let newFeedback = new FeedbackModel(req.body);
      await newFeedback.save(); 
      res.status(200).send({ msg: "Feedback Added Successfully", event: newFeedback });
    } catch (err) {
      res.status(400).send({ msg: "Not Added Feedback", error: err.message });
    }
  });

module.exports = {feedbackRouter}