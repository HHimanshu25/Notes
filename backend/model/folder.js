import mongoose from "mongoose";
const Folderschema = new mongoose.Schema({    
    title: String        
    
})
export default mongoose.model('Folder', Folderschema)