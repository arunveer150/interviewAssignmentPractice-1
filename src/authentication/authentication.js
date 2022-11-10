const jwt=require('jsonwebtoken')


let authentication=async (req,res,next)=>{
let token=req.headers.token

if(!token){
    return res.status(400).send({status:false,message:"Token is absent"})
}

let decode=await jwt.verify(token,"radon",function(err,data){
    if(err){
        return res.status(400).send({status:false,message:"Token is invalid"})
    }

    req.userId=data.userId
})

next()

}

module.exports={authentication}
