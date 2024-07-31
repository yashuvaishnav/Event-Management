const mongoose=require("mongoose");
mongoose.set('strictQuery', true);

const adminSchema=mongoose.Schema({
    name:String,
    contact : Number,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{
    versionKey:false
})

const AdminModel=mongoose.model("admin",adminSchema);
module.exports={AdminModel};