import jwt from "jsonwebtoken"
import { asyncHandler } from "../../utils/asyncHandler.js"
import { ApiError } from "../../utils/ApiError.js"
import { User } from "../../models/users.model.js"
import { generateAccessTokenAndRefreshTOken } from "./genrateAccessTokenAndRefresh.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
const refreshAccessToken = asyncHandler(async (req,res)=>{
    console.log("refresh token in refresh token route  ",req.cookies.refreshToken)
    
    const incommingRefrshToken = req.cookies.refreshToken || req.body.refreshToken
    if(!incommingRefrshToken)
    {
        throw new ApiError(401,"unauthorized request")

    }

   try {
     const decodeToken = jwt.verify(incommingRefrshToken, process.env.REFRESH_TOKEN_SECRET)
 
     const user = await User.findById(decodeToken?._id)
 
     if(!user){
         throw new ApiError(401,"invalid refresh token")
 
     }
 
     if(incommingRefrshToken !==user?.refreshToken){
         throw new ApiError(401,"refrsh token is used or expired")
 
     }
 
     const options = {
         httpOnly:true,
         secure:true
     }
 
     const {accessToken ,refreshToken} = await generateAccessTokenAndRefreshTOken(user?._id)
     res.status(200)
     .cookie("accessToken",accessToken,options)
     .cookie("refreshToken",refreshToken,options)
     .json(new ApiResponse(201,{accessToken,refreshToken},"accesstoken and refresh token is refrshed successfully"))
   } catch (error) {
      throw new ApiError(401,error.message||"invalid refresh Token")
   }
    


})

export {refreshAccessToken}