const userModel = require("../models/userModel")
const bcryptjs = require("bcryptjs")
const { generateToken, veriifyToken } = require("../services/sessionService")


const signup = async (req, res)=>{
    try {
        const {userName, email, password} = req.body

        const checkExistingDetails = await userModel.findOne({
            $or:[{email: email}, {userName: userName}]
        })
        if (checkExistingDetails) {
            return res.status(409).send({message: "email or username already in use"})
        }
    const result = await userModel.create({userName, email, password})
    if(!result){
        return res.status(400).send({message: "Error creating user"})
    }
    return res.status(201).send({message: "Account created sucessfully", result})
    } catch (error) {
        console.log(error)
        return res.status(500).send({error})
    }
    

}

const signin = async (req, res)=>{
    try {
        const {email, password} = req.body
        console.log(req.body)
        const result = await userModel.findOne({email})
        const compare = await bcryptjs.compare(password, result.password)
        console.log(compare)

        if (!result || !compare) {
            return res.status(401).send({message: "invalid email or password"})
        }
        const token = generateToken(email)
    
        return res.status(200).send({message: `Welcome ${result.userName}`, token, result})
    } catch (error) {
        console.log(error);
        return res.status(500).send({error})
    }
}

const verifyUserToken = async(req, res, next)=>{
   try {
    const auth = req.headers.authorization
    console.log( auth)
    const token = auth.split(" ")[1]
    // console.log("t",token)
    if(!token){
        return res.status(401).send({message: "Unauthorized"})

    }
    const userEmail = veriifyToken(token)
    const user = await userModel.findOne({email: userEmail})
    console.log("user", userEmail)

    return res.status(200).send({message: "user verification sucessful", user})
   } catch (error) {
        console.log(error)
        return res.status(500).send({message: error.message})
   }

}

module.exports = {signup, signin, verifyUserToken}