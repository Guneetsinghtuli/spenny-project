const express = require('express')
const {feedController, getUserfeed} = require('../Controller/feedController')
const userAuth = require('../Middleware/Auth')
const feed = express.Router()
//All tweets
feed.route("/").get(userAuth,feedController)
//Users own Tweets
feed.route("/get").get(userAuth,getUserfeed)

module.exports = feed