const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    email: {
        type:String,
        required: true,
        unique: true,
        trim:true
    },
    password: {
        type:String,
        required: true,
        trim:true
    },
    follows: {
        type: [mongoose.ObjectId],
        default: []
    }
})

const user = mongoose.model('user',userSchema) 

module.exports = user