const mongoose = require('mongoose')

const database = (uri) =>{
    try {
        mongoose.connect(uri,()=>{
            console.log("Successfully connected to Database")
        })
    } catch (error) {
        console.log(error)
    }
    
}

module.exports = database
