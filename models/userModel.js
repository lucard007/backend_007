const mongoose = require("mongoose")
const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: Number,
        default: 0  
    },
    profilePic:{
        type: String,
        default: "https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
    }

})

userSchema.pre("save", function(next){
    let saltRound = 10
    console.log(this)
    if(this.password !== undefined){
        bcryptjs.hash(this.password, saltRound).then((hashedPassword)=>{
            console.log(hashedPassword)
            this.password = hashedPassword
            console.log(this)
            next()
        })
      
    }
    


})

const userModel = mongoose.models.user_tbs || mongoose.model("user_tbs", userSchema)
module.exports = userModel

