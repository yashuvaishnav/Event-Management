
const express=require("express");
const {ClientSuggestionModel} = require("../Models/suggestionModel")
const clientSuggestionRouter = express.Router();

clientSuggestionRouter.get("/",async(req,res)=>{
    try {
        let clientSuggestion = await ClientSuggestionModel.find()
        res.send(clientSuggestion)
    } catch (error) {
        res.send({msg:"Client suggestions not found"})
    }
})

clientSuggestionRouter.post("/clientSuggestion", async (req, res) => {
    try {
      let newClientSuggestion = new ClientSuggestionModel(req.body);
      await newClientSuggestion.save(); 
      res.status(200).send({ msg: "Client suggestion Added Successfully", clientSuggestion: newClientSuggestion });
    } catch (err) {
      res.status(400).send({ msg: "Not Added client suggestion", error: err.msg });
    }
  });

module.exports = {clientSuggestionRouter}