const userModel = require("../Models/userModel")

const followControler = async (req, res, next) => {
    try {
        let user = await userModel.findById(req.user)
        if (user == null) {
            return res.send({
                success: false,
                message: "You are not authorised"
            })
        }
        let findUser = await userModel.findById(req.body.follow)
        console.log(findUser)
        if(findUser == null){
            return res.send({
                success:false,
                message:"No user with that ID exists"
            })
        }
        let currentFollowing = user.follows
        let flag = 0
        currentFollowing.forEach(element => {
            if(element == req.body.follow){
                flag = 1
            }
        })
        if(flag){
            return res.send({
                success:false,
                message:"You are already following"
            })
        }
        currentFollowing.push(req.body.follow)
        let updated = await userModel.findByIdAndUpdate(req.user, { follows: currentFollowing }, { new: true })
        updated.save().then(()=>{
            console.log("Followed successfully")
        })
        return res.send({
            message: `You are following ${req.body.follow}`,
            success: true
        })
    } catch (error) {
        return res.status('500').json({message:error, success: false})
    }

}

module.exports = followControler