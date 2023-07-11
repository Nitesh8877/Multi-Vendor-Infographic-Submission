const User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const contants=require('../utils/constatnt');
const authConfig=require('../configs/auth.config');
const constatnt = require('../utils/constatnt');

exports.signup=async(req,res)=>{
    
    let user={
        username:req.body.username,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password,8),
        accountType:req.body.accountType,
        userType:req.body.userType
    }

    try {
        try {
            let username=await User.findOne({username:user.username});
            let email=await User.findOne({email:user.email})
            if(username){
                return res.status(200).send({
                    message:"Username is already exist please enter different Username"
                })
            }
           else if(email){
                return res.status(200).send({
                    message:"Eamil is already exist please try another email!"
                })
            }else {
                let response=await User.create(user);
                res.status(200).send({
                    message:"Registration successfully!",
                    data:response
                });
            }
    
        } catch (error) {
            return res.status(500).send({
                message:"Something went wrong",
                error:error
            })
        }
    
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong",
            erro:error
        })
    }
}

exports.signin=async(req,res)=>{
    
  


    try {
        if(!req.body.username){
            return res.status(400).send({
                message:"Username is not provided"
            })
        }
        if(!req.body.password){
            return res.status(400).send({
                message:"Password is not provided"
            })
        }
        let user=await User.findOne({username:req.body.username})
        if(user===null){
            return res.status(401).send({
                message:"User with the given username not found!"
            })
        }
        const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
        if(!isPasswordValid){
            return res.status(403).send({
                message:"Invalid Password"
            })
        }
        const token=jwt.sign({username:user.username},authConfig.SecretKey,{expiresIn:3600})
        
        res.status(200).send({
            username:user.username,
            email:user.email,
            accountType:user.accountType,
            token:token
        })

    } catch (error) {
        res.status(500).send({
            message:"Something went wrong"
        })
    }
}



exports.getAllUsers=async(req,res)=>{
    try {
        let result=await User.find()
        res.status(200).send({
            message:"Fetch all data success",
            data:result
        })
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong",
            status:false,
            ErrorMsg:error.message
        })
    }
}