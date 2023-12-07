const express = require("express")
const app = express()
require("dotenv").config()
const mongoose = require("mongoose")
const userRouter = require("./routes/userRouter")
const cors = require("cors")

app.use(express.urlencoded())
app.use(express.json())
app.use(cors({origin: "*"}))

app.use("/users", userRouter)


const connect = ()=>{
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("connected to mongodb")
    }).catch((err)=>{
        console.log(err);
    })
}
connect()
app.listen(4000,()=>{
    console.log('app listening on port 4000')
})