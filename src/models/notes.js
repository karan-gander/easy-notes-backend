import mongoose, { Schema } from "mongoose";

const notesSchema = new mongoose.Schema({
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
    
    medium:{
        type:String,
        required:[true,"Please select your medium"]
    },
    url:{
        type:String,
        required:true
    },
    fileName:{
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


export const Note = mongoose.model("Note",notesSchema)
