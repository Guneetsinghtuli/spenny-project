const express = require('express')
const cors = require('cors')
const redis = require('redis')
const session = require('express-session')

let RedisStore = require('connect-redis')(session)


const { MONGO_IP, MONGO_USER, MONGO_PASSWORD, MONGO_PORT, REDIS_IP, REDIS_PORT, SESSION_SECRET } = require('./config/config')

let redisClient = redis.createClient({
    host: REDIS_IP,
    port:REDIS_PORT

})
const database = require('./db')
const dotenv = require('dotenv').config()
const feed = require('./Router/feedRouter')
const tweetRouter = require('./Router/tweetRouter')

const user = require('./Router/userRouter')

const app = express()
// Environment Variables
const port = process.env.PORT || 3000
const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/`

app.use(express.json())
app.enable("trust proxy")
app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    })
  )
app.use(cors())
// Database Connection
database(uri)


// Main Routes
app.use("/api/v1/user",user)
app.use("/api/v1/feed",feed)
app.use("/api/v1/tweet",tweetRouter)



//Default Route
app.get("/api",(req,res,next)=>{
    res.send("Hey welcome")
    console.log("Hey")
})


// Listener
app.listen(port,()=>{
    console.log(`Server is working on port ${port}`)
})