import {User} from "../models/users.model.js"
import jwt from "jsonwebtoken"
import {ApiError} from "../utils/ApiError.js"
import {asyncHandler} from "../utils/asyncHandler.js"

export const verifyJWT = asyncHandler(async (req,_,next)=>{
        // console.log("my coookie",req.cookies)
    try {
        const token = req.cookies?.accessToken || req.headers["Authorization"]?.replace("Bearer","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        
        const user = await User.findById(decodedToken._id)
    
        if(!user){
            throw new ApiError(401,"invalid accessToken")
    
        }
        req.user = user
    
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid accesstoken")
        
    }
    


})