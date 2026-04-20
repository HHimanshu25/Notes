import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()
const mongo_uri = process.env.DB_URI
const db_name = process.env.DB_NAME
async function dbconnect(){
    try{

        const response = await mongoose.connect(`${mongo_uri}/${db_name}`)
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