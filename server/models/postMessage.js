import mongoose from "mongoose";

//creating mongoose model
//specifying the properties each post have

const postSchema = mongoose.Schema({
    title:String,
    message:String,
    creator:String,
    name:String,
    tags:[String],
    selectedFile:String,
    likes:{
        type:[String],
        default:[]
    },
    createdAt:{
        type:Date,
        default:new Date()
    },
});

const postMessage = mongoose.model('postMessage',postSchema);
export default postMessage;