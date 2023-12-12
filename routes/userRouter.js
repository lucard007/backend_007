const { signup, signin, verifyUserToken, imageUpload} = require("../controllers/userController")

const userRouter = require("express").Router()



userRouter.post("/signup", signup)
userRouter.post("/signin", signin)
userRouter.get("/verify", verifyUserToken)
userRouter.post("/upload", imageUpload)




module.exports = userRouter

