import { asyncHandler } from "../../utils/asyncHandler.js"
import {User} from "../../models/users.model.js"
import {ApiResponse} from "../../utils/ApiResponse.js"

export const logout = asyncHandler(async (req,res)=>{

    // await User.findByIdAndUpdate(req.user._id,{
    //     $set:{
    //         refreshToken:undefined
    //     }
    // },{
    //     new:true
    // })

    return res
    .status(200)
    .clearCookie("accessToken")
    
    .json( new ApiResponse(200,{},"User logged out"))


})