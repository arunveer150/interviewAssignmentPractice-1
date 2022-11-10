const mongoose=require('mongoose')
const login=require("../models/model.js")
const validator=require('email-validator')
const jwt=require('jsonwebtoken')
const student=require('../models/student.js')


let createAccount=async (req,res)=>{
    try{
        let data=req.body

        if(!data.name){
            return res.status(400).send({status:false,message:"Name field is required..."})
        }

        if(!data.email){
            return res.status(400).send({status:false,message:"email field is required..."})
        }

        if(validator.validate(data.email)==false){
            return res.status(400).send({status:false,message:"Email is invalid..."})
        }

        let check=await login.findOne({email:data.email})
        if(check){
            return res.status(400).send({status:false,message:"this email id already exists.."})   
        }

        if(!data.password){
            return res.status(400).send({status:false,message:"Password field is required..."})
        }

        if(data.password.length<8){
            return res.status(400).send({status:false,message:"password length should be greater than 8..."})
        }

        let create=await login.create(data)
        return res.status(201).send({status:true,message:"Success",data:create})
    }
    catch(err){
        return res.status(500).send({status:false,Error:err.message})
    }
}

let createStudent=async (req,res)=>{
    let data=req.body

    let id=req.params.id

    if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({status:false,message:"teacherId  is invalid"})
    }

    let check1=await login.findById(id)
    if(!check1){
        return res.status(404).send({status:false,message:"No teacher found"})
    }

    if(req.userId!=id){
        return res.status(403).send({status:false,message:".......Authorisation Failed......"})
    }

    if(!data.name){
        return res.status(400).send({status:false,message:"Name field is required..."})
    }

    if(!data.subject){
        return res.status(400).send({status:false,message:"subject field is required..."})
    }

    if(!data.marks){
        return res.status(400).send({status:false,message:"marks field is required..."})
    }

    let check=await student.findOne({name:data.name,subject:data.subject})

    if(check){
        data.marks=data.marks+check.marks
        let update=await student.findOneAndUpdate({name:data.name,subject:data.subject},{$set:{marks:data.marks}},{new:true})

        return res.status(200).send({status:true,data:update})
    }else{
        let create=await student.create(data)
        return res.status(201).send({status:true,data:create})
    }

}

let logi=async (req,res)=>{
    let data=req.body

    if(!data.email){
        return res.status(400).send({status:false,message:"email field is required..."})
    }

    if(!data.password){
        return res.status(400).send({status:false,message:"Password field is required..."})
    }

    let check=await login.findOne({email:data.email,password:data.password})

    if(!check){
            return res.status(400).send({status:false,message:"Email or password is wrong...."})
    }
    
    let token=await jwt.sign({
        userId:check._id.toString()
    },"radon")

        return res.status(200).send({status:true,token:token}) 

}

let getList=async (req,res)=>{
    let data=req.query

    let id=req.params.id
    if(!mongoose.isValidObjectId(id)){
        return res.status(400).send({status:false,message:"teacherId is invalid"})
    }

    let check1=await login.findById(id)
    if(!check1){
        return res.status(404).send({status:false,message:"No teacher found"})
    }

    if(req.userId!=id){
        return res.status(403).send({status:false,message:".......Authorisation Failed......"})
    }

    let obj={isDeleted:false}

    if(data.name){
        obj.name=data.name
    }

    if(data.subject){
        obj.subject=data.subject
    }

    let findData=await student.find(obj).select({"name":1,"subject":1,"marks":1})
    if(findData.length==0){
        return res.status(404).send({status:false,message:"No data found"})
    }

    return res.status(200).send({status:true,data:findData})
}

let update=async (req,res)=>{
    try{
        let data=req.body
        let id=req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send({status:false,message:"teacherId is invalid"})
        }

        let check1=await login.findById(id)
        if(!check1){
            return res.status(404).send({status:false,message:"No teacher found"})
        }

        if(req.userId!=id){
            return res.status(403).send({status:false,message:".......Authorisation Failed......"})
        }

      let studentId=data.studentId

    let obj={}
    if(!mongoose.isValidObjectId(studentId)){
        return res.status(400).send({status:false,message:"StudentId is invalid"})
    }

    let check=await student.findById(studentId)
    if(!check){
        return res.status(404).send({status:false,message:"No student found"})
    }

    if(data.name){
        obj.name=data.name
    }

    if(data.subject){
        obj.subject=data.subject
    }

    if(obj.marks){
        obj.marks=data.marks
    }

    let update=await student.findOneAndUpdate({_id:studentId},{$set:obj},{new:true})

    return res.status(200).send({status:false,data:update})
}
catch(err){
    return res.status(500).send({status:false,Error:err.message})
}
}

let deleteData=async (req,res)=>{
    try{
        let data=req.body

        let id=req.params.id
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).send({status:false,message:"teacherId is invalid"})
        }

        let check1=await login.findById(id)
        if(!check1){
            return res.status(404).send({status:false,message:"No teacher found"})
        }

        if(req.userId!=id){
            return res.status(403).send({status:false,message:".......Authorisation Failed......"})
        }

        let studentId=data.studentId

        if(!mongoose.isValidObjectId(studentId)){
            return res.status(400).send({status:false,message:"StudentId is invalid"})
        }
    
        let check=await student.findById(studentId)
        if(!check){
            return res.status(404).send({status:false,message:"No student found"})
        }

        await student.findOneAndUpdate({_id:studentId,isDeleted:false},{$set:{isDeleted:true}})

       return res.status(200).send({status:true,message:"This student data is deleted.."})

    }
    catch(err){
        return res.send(500).send({status:false,Error:err.message})
    }
}

module.exports={createAccount,logi,createStudent,getList,update,deleteData}