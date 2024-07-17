import { Admin } from "../../../models/admin.js"
import jwt from "jsonwebtoken"
import { ApiError } from "../../../utils/ApiError.js"
import { asyncHandler } from "../../../utils/asyncHandler.js"

export const verifyJWT = asyncHandler(async (req,_,next)=>{
        // console.log("my coookie",req.cookies)
    try {
        const token = req.cookies?.adminAccessToken || req.headers["Authorization"]?.replace("Bearer","")
    
        if(!token){
            throw new ApiError(401,"Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
        
        const admin = await Admin.findById(decodedToken._id)
        
        if(!admin){
            throw new ApiError(401,"invalid accessToken")
    
        }
        req.admin = admin
    
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid accesstoken")
        
    }
    


})