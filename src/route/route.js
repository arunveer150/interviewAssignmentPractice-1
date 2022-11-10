const express=require('express')
const router=express.Router()

const controller=require('../controller/controller')
const auth=require('../authentication/authentication')

router.post('/teacher',controller.createAccount)

router.post('/login',controller.logi)

router.post('/student/:id',auth.authentication,controller.createStudent)

router.get('/student/:id',auth.authentication,controller.getList)

router.put('/student/:id',auth.authentication,controller.update)

router.delete('/student/:id',auth.authentication,controller.deleteData)

module.exports=router
