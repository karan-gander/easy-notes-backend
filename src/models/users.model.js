import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:true
    },
    fullName:{
        type:String,
        required:true,
        trim:true
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
   try {
     if(!this.isModified("password")) return next()
     
      this.password = await bcrypt.hash(this.password,8)
      next()
   } catch (error) {
    console.log(error)
   }
})



userSchema.methods.isPasswordCorrect  = async function(password){
    
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken = async function(){
        // console.log("i am acesss in schema")
    return jwt.sign({
        _id:this._id,
        email:this.email,
        fullname:this.fullName

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}


userSchema.methods.generateRefreshToken = async function(){
    // console.log("Hi i am refresh")
    return jwt.sign(
        {   
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )

}

export const  User = mongoose.model("User",userSchema)