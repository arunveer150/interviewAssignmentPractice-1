const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId

let student=mongoose.Schema({
    teacherId:{
        type:ObjectId,
        ref:"LoginPage"
    },
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