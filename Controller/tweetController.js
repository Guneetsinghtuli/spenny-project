const tweetModel = require("../Models/tweetModel")
const { validationResult } = require('express-validator');


const tweet = async(req,res,next) =>{
    let err = validationResult(req).errors
    if(err.length){
        return res.send({
            success:false,
            message:err
        })
    }

    let user = await tweetModel.findOne({user: req.user})

    let oldTweets = user.tweets
    let date = new Date()
    let newTweet ={
        date: date,
        msg: req.body.msg,
    }
    oldTweets.unshift(newTweet)
    let update = await tweetModel.findByIdAndUpdate(user._id,{tweets: oldTweets},{new: true})
    update.save().then(()=>{
        console.log("Saved")
    })

    return res.send({
        success: true,
        message:"Hey you just made a tweet"
    })



}

module.exports = tweet