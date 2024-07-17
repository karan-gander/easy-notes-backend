import mongoose from "mongoose";
import { DB_NAME } from "../contant.js";



const  connectionDB = async()=>{
    try{
        const connection = await mongoose.connect(`${process.env.MONGO_URL}/${DB_NAME}`)
        console.log(`Your host is ${connection.connection.host}`)
    }
    catch(err)
        {
            console.log(err)
            throw  err
        }
}



export default connectionDB