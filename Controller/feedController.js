const tweetModel = require("../Models/tweetModel");
const userModel = require("../Models/userModel")


const feedSort = ()=>{

}



const feedController = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user);

        if (user == null) {
            return res.send({
                success: false,
                message: "User does not exist"
            })
        }
        // Array of people i follow 
        let following = user.follows
        // collect all tweets
        let feed = []
        for (const person of following) {
            let followingUser = await tweetModel.findOne({ user: person })

            let msg = followingUser.tweets

            feed.push(...msg)
        }

        // Sorting
        feed.sort((firstEl, secondEl) => {
            if (firstEl.date >= secondEl.date) {
                return -1
            }
            else {
                return 1
            }
        })

        res.send({
            success:true,
            feed,
        })
    } catch (error) {
        return res.status('500').json({ message: "Internal Server Error", success: false })
    }

}


const getUserfeed = async (req,res,next) =>{
    try {
        let userTweet = await tweetModel.findOne({user:req.user}).select('tweets')
        res.send({
            success:false,
            userTweet:userTweet.tweets
        })
    } catch (error) {
        return res.status('500').json({ message: "Internal Server Error", success: false })

    }
    
}


module.exports = {
    feedController, getUserfeed
}