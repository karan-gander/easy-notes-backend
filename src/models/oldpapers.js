import mongoose, { Schema } from "mongoose";

const papersSchema = new mongoose.Schema({
    branch:{
        type:String,
        required:[true,"Please select your branch"]
    },
    // year:{
    //     type:String,
    //     required:[true,"Please select your year"]
    // },
    semester:{
        type:String,
        required:[true,"Please select your semsester"]
    },
    
    fileName:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    googleID:{
        type:String
    },
    refreshToken:{
        type:String
    }

})


export const Paper = mongoose.model("Paper",papersSchema)
