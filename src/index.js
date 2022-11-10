const express=require('express')
const mongoose=require('mongoose')
const route=require('./route/route.js')
const app=express()

app.use(express.json())
app.use(express.urlencoded())

mongoose.connect("mongodb+srv://arunveer150:Arun%40123@cluster0.i5ekm4o.mongodb.net/Interview-Assignment-1",{
    useNewUrlParser:true
}).then(()=>console.log("MongoDB is connected"))
.catch((err)=>console.log(err.message))

app.use("/",route)

app.listen(process.env.PORT || 3000,()=>console.log("System is running on Port"+" "+(process.env.PORT||3000)))
