import mongoose from "mongoose";
const Noteschema = new mongoose.Schema({
    title: String,
    content: String,
    email:String,
    date:{type:Date , 
        default:Date.now
    }
})
export default mongoose.model('Note', Noteschema)