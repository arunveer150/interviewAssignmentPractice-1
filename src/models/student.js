const mongoose=require('mongoose')

let student=mongoose.Schema({
    name:{
        type:String
    },
    subject:{
        type:String
    },
    marks:{
        type:Number
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports=mongoose.model("studentData",student)