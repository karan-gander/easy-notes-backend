import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const adminSchema = new mongoose.Schema({
    adminId:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    }
    
},{timestamps:true})

adminSchema.pre("save",async function(next){
   try {
     if(!this.isModified("password")) return next()
     
      this.password = await bcrypt.hash(this.password,8)
      next()
   } catch (error) {
    console.log(error)
   }
})



adminSchema.methods.isPasswordCorrect  = async function(password){
    
    return await bcrypt.compare(password,this.password)
}


adminSchema.methods.generateAccessToken = async function(){
        console.log("i am acesss in schema")
    return jwt.sign({
        _id:this._id,
        adminId:this.adminId
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ADMIN_ACCESS_TOKEN_EXPIRY
    }
    )
}




export const  Admin = mongoose.model("admin",adminSchema)