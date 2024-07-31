
const express=require("express");
const {ClientModel} = require("../Models/clientModel")
const clientRouter = express.Router();

clientRouter.get("/",async(req,res)=>{
    try {
      let query = {};
      if (req.query.searchQuery) {
        query = { $or: [
          { companyName: { $regex: req.query.searchQuery, $options: 'i' } }, // Case-insensitive search by companyName
          { email: { $regex: req.query.searchQuery, $options: 'i' } } // Case-insensitive search by email
        ]};
      }
      const clients = await ClientModel.find(query);
      res.status(200).send(clients);
    } catch (error) {
        res.status(400).send({"msg":"Clients not found"})
    }
})

clientRouter.post("/registration", async (req, res) => {
    let obj = req.body;
      if (!/^\d{10}$/.test(obj.contact)) {
        return res
          .status(200)
          .send({
            msg: "Contact number must contain exactly 10 digits",
          });
      }
    try {
        const findTheClientAlreadyExist = await ClientModel.findOne({
            companyName: obj.companyName
          });
          if (findTheClientAlreadyExist) {
            return res
              .status(201)
              .send({ msg: "This Company Is Already Registerd" });
          } else {
                let newClient = new ClientModel(obj);
                await newClient.save();
                res.status(200).send({ msg: "Registered Successfully", client: newClient });
          }
    } catch (err) {
      res.status(400).send({ msg: "Not Added Client", error: err.message });
    }
  });

module.exports = {clientRouter}