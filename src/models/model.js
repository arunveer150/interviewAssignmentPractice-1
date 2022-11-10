const mongoose=require('mongoose')

let mod=mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps:true})

module.exports=mongoose.model("LoginPage",mod)