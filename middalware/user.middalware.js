const User=require('../models/user.model');
const jwt=require('jsonwebtoken')
const constant=require('../utils/constatnt')
const authConfig=require('../configs/auth.config')
validateField=async(req,res,next)=>{

   
        if(!req.body.username){
            return res.status(400).send({
                message:"Failed! Username is not provided"
            })
        }

        if(!req.body.email){
            return res.status(400).send({
                message:"Failed! Email is not provided"
            })
        }

        if(!req.body.password){
            return res.status(400).send({
                message:"Failed! Password is not provided"
            })
        }
        next();
}

const verifyToken=(req,res,next)=>{
    let token=req.headers['x-access-token'];
    if(!token){
        return res.status(403).send({
            message:"Token not provided"
        })
    }
    jwt.verify(token,authConfig.SecretKey,(err,decoded)=>{
        if(err){
            return res.status(401).send({
                message:"Unauthorized!"
            })
        }
        req.username=decoded.username
        next();
    })
}

const isAdmin=async(req,res,next)=>{
    console.log(req.username)
    try {
        let user=await User.findOne({
            username:req.username
        })
        if(user && user.userType===constant.userTypes.ADMIN){
            next();
        }else{
            return res.status(403).send("Failed! User not admin....")
        }
    } catch (error) {
        res.status(500).send("Something went wrong")
    }
}

module.exports={
    validateField:validateField,
    verifyToken:verifyToken,
    isAdmin:isAdmin
}