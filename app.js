const express = require('express')
const database = require('./db')
const dotenv = require('dotenv').config()
const feed = require('./Router/feedRouter')
const tweetRouter = require('./Router/tweetRouter')

const user = require('./Router/userRouter')

const app = express()

// Environment Variables
const port = process.env.PORT || 3000
const uri = process.env.URI || "mongodb://localhost:27017/spenny"

app.use(express.json())


// Database Connection
database(uri)


// Main Routes
app.use("/api/v1/user",user)
app.use("/api/v1/feed",feed)
app.use("/api/v1/tweet",tweetRouter)



//Default Route
app.get("/",(req,res,next)=>{
    res.send("Hey welcome")
})


// Listener
app.listen(port,()=>{
    console.log(`Server is working on port ${port}`)
})