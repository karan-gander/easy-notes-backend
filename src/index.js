import mongoose from "mongoose";
import connectionDB from "./DB/connection.js";
import dotenv from "dotenv"
import { app } from "./app.js";
dotenv.config({
    path:".env"
})
 connectionDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`app is running on port ${process.env.PORT||8000}`)
    })
 }).catch((err)=>{
    console.log("MONGODB connection is failed ")
 })

// (async ()=>{
//     try{
//         await mongoose.connect(process.env.MONGO_URL/DB_NAME)

//     }
//     catch(err){
//         console.log("ERROR in mo ",err)
//         throw err
//         process.exit(1)


//     }
// })()