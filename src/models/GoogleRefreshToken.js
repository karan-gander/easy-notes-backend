import mongoose, { Schema } from "mongoose";

const refreshSchema = new mongoose.Schema({
    refreshToken:{
        type:String


    }
    
},{timestamps:true})


export const RefreshToken = mongoose.model("RefreshToken",refreshSchema)