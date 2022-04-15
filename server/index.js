import express from "express";
import 'dotenv/config'
import mongoose from "mongoose"
import cors from "cors"
import postRouter from "./routes/posts.js";
import userRouter from "./routes/user.js"

const app = express();



app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.use("/posts",postRouter)
app.use("/user",userRouter)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server running on ${PORT}`)))
.catch((error)=>console.log(error.message));

// mongoose.set('findAndModify',false);