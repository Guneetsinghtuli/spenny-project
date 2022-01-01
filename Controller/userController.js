const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const saltRounds = process.env.ROUNDS || 11;
const privateKey = process.env.JWT_SEC || "1234"

const { validationResult } = require('express-validator');
const userModel = require('../Models/userModel');
const tweetModel = require('../Models/tweetModel');


const login = async (req,res,next) =>{
    try {
        let err = validationResult(req).errors
        if(err.length){
            return res.send({
                success:false,
                message:err
            })
        }


        const user = await userModel.findOne({email:req.body.email})
        if(user == null){
            return res.send({
                success: false,
                message: "No User with this email exists"
            })
        }
        
        const twitter = await tweetModel.findOne({user: user._id})
        if(twitter == null){
            let makeUser = new tweetModel({
                user:user._id,
            })
            makeUser.save().then(()=>{
                console.log("User ready to tweet")
            })
        }

        let passCheck = await bcrypt.compare(req.body.password, user.password)

        if(!passCheck){
            return res.send({
                success: false,
                message: "Please check your credentials"
            })
        } 

        const sendDetails = {
            id:user._id
        }

        const authToken = await jwt.sign(sendDetails, privateKey)

        return res.send({
            success:true,
            authToken:authToken,
            id: user._id,
            message:"You are successfully logged in"
        })
          
    } catch (error) {
        return res.status('500').json({message:"Internal Server Error", success: false})
    }
    

}
const signup = async (req,res,next) =>{
    try {
        // Basic validation that user has entered all the details
        let err = validationResult(req).errors
        if(err.length){
            return res.send({
                success:false,
                message:err
            })
        }
        // Check if the email already exists
        const emailCheck = await userModel.findOne({email:req.body.email})

        if(emailCheck){
            return res.send({
                success: false,
                message: "A User with the same email already exists"
            })
        }


        // Hashing the password
        const hash = await bcrypt.hash(req.body.password, saltRounds)

        // Saving the user
        const userDetails = {
            email:req.body.email,
            password: hash,
        }

        const user = new userModel(userDetails)

        user.save().then(()=>{
            console.log("User added Successfully")
        })


        return res.send({
            success: true,
            message:"User Saved successfully"
        })

        // Sending result
    } catch (error) {
        return res.status('500').json({message:"Internal Server Error", success: false})
    }
}

module.exports = {login,signup}