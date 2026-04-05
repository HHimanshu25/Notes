import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

export default mongoose.model('User',userschema)