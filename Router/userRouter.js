const express = require('express')
const { login, signup } = require('../Controller/userController')
const user = express.Router()

const { body } = require('express-validator');

const followControler = require('../Controller/followController');
const userAuth = require('../Middleware/Auth');

let signupCheck = [
    body('email')
    .exists()
    .withMessage("Email Cannot be Left Blank")
    .isEmail()
    .withMessage("Please enter a Valid email")
    ,
    body('password')
    .exists()
    .withMessage("Password Cannot be Left Blank")
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
]

let loginCheck = [
    body('email')
    .exists()
    .withMessage("Email Cannot be Left Blank")
    .isEmail()
    .withMessage("Please enter a Valid email")
    ,
    body('password')
    .exists()
    .withMessage("Password Cannot be Left Blank")
]
// DOne
user.route("/login").post(loginCheck,login)
// DOne
user.route("/login/follow").put(userAuth,followControler)
// /DOne
user.route("/signup").post(signupCheck,signup)


module.exports = user