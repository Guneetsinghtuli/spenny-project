const express = require('express')
const tweet = require('../Controller/tweetController')
const userAuth = require('../Middleware/Auth')
const tweetRouter = express.Router()

const { body } = require('express-validator');

let tweetCheck = [
    body('msg')
    .exists()
    .withMessage("Tweet cannot be empty")
    .isLength({min: 1,max:140})
    .withMessage("Tweet cannot have a length less than 1 and more than 140 words")
]

// Done
tweetRouter.route("/").post(userAuth,tweetCheck,tweet)


module.exports = tweetRouter