const mongoose = require('mongoose')
const { Schema } = mongoose

const tweetSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    tweets: {
        type: [
            {
                date: {
                    type: Date,
                    required: true,
                },
                msg: {
                    type: String,
                    maxlength: 140,
                    required: true
                }
            }
        ],
        default: []
    }
})
const tweetModel = mongoose.model('tweet', tweetSchema)

module.exports = tweetModel