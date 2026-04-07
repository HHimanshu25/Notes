import mongoose from "mongoose";

async function dbconnect(){
    try{

        const response = await mongoose.connect("mongodb://localhost:27017/Note")
        if(response){
            console.log('data base connect successfully');
        }
        else{
            console.log('Check you connnection');
        }

    }
    catch(error){
        console.log(error);
    }
}
export default dbconnect