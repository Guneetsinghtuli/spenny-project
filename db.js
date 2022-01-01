const mongoose = require('mongoose')

const database = (uri) =>{
    mongoose.connect(uri,()=>{
        console.log("Successfully connected to Database")
    })
}

module.exports = database
