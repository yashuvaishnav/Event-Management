const express=require("express");
const bcrypt=require('bcrypt');
const {AdminModel} = require("../Models/adminModel")
const adminRouter = express.Router();
const jwt = require("jsonwebtoken");

// get user
adminRouter.get("/",async(req,res)=>{
    try {
        let user = await AdminModel.find()
        res.send(user)
    } catch (error) {
        res.send({"msg":"User not found"})
    }
})
// signup

adminRouter.post("/signup", async (req, res) => {
  try {
    let obj = req.body;
    if (obj.email !== "admin@gmail.com") {
      return res.status(400).send({ msg: "Only admin is allowed to register" });
    }
    if (!/(?=.*[A-Z])(?=.*\d)/.test(obj.password)) {
      return res.status(404).send({
        msg: "Password must contain at least one uppercase letter and one number",
      });
    }
    const findTheUserAlreadyExist = await AdminModel.findOne({ email: req.body.email });
    if (findTheUserAlreadyExist) {
      return res.status(404).send({ msg: "This Email Is Already Registered" });
    } else {
      bcrypt.hash(obj.password, 10, async (err, hashed) => {
        if (err) {
          return res.status(400).send({
            msg: "Sorry for inconvenience as password is not hashed",
          });
        }
        let newUser = new AdminModel({ ...obj, password: hashed });
        await newUser.save();
        res.status(200).send({ msg: "Registered Successfully", user: newUser });
      });
    }
  } catch (err) {
    res.status(400).send({ msg: "Error Registering User" });
  }
});

// login
adminRouter.post("/login",async(req,res)=>{
    try{
    const isEmailReg=await AdminModel.findOne({email:req.body.email});
    if(!isEmailReg){
        return res.status(400).send({msg:"This EmailId is not registered"});
    }
    else{
        bcrypt.compare(req.body.password,isEmailReg.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userName:req.body.userName,userId:req.body._id},"secretkey");
                res.status(200).send({msg:"Logged Successfully",token:token,user:isEmailReg});
            }
            else{
                res.status(400).send({msg:"Incorrect Password"});
            }
        })
    }
    }
    catch(err){
    res.status(400).send({msg:"Error LoggingIn"});
    }
})

// logout
adminRouter.post("/logout",async(req,res)=>{
    // console.log(req.body.logoutToken)
    try {
        res.status(200).send({"msg":"Logged out Successfully"})
    } 
    catch (error) {
      res.status(400).send({ msg: "Error Logging Out", error: err.msg });
    }
})


module.exports = {adminRouter}