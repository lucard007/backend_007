const jwt = require("jsonwebtoken")

const generateToken = (payload)=>{
   try {
    console.log(payload)
    const token = jwt.sign({payload}, process.env.SECRET_KEY, {expiresIn: "24h"})

    return token;

   } catch (error) {
     console.log(error)
   }
}

const veriifyToken = (token)=>{
  try {
    const decodedToken =  jwt.verify(token, process.env.SECRET_KEY)
    const email = decodedToken.payload
    return email
  } catch (error) {
    console.log(error)
    if(error.name == "TokenExpiredError"){
      throw new Error("Session expired please login again")
    }
    throw new Error("please login to continue")
  }
}
module.exports = {generateToken, veriifyToken}