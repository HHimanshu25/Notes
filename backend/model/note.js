import mongoose from "mongoose";
const Noteschema = new mongoose.Schema({
    title: String,
    content: String,
    user_id : String,
    date:{type:Date, default:Date.now},
    folder: String        
    
})
export default mongoose.model('Note', Noteschema)