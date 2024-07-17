import { asyncHandler } from "../../utils/asyncHandler.js"
// import {User} from "../../models/users.model.js"
import {ApiResponse} from "../../utils/ApiResponse.js"

export const adminLogout = asyncHandler(async (req,res)=>{

    // await User.findByIdAndUpdate(req.user._id,{
    //     $set:{
    //         refreshToken:undefined
    //     }
    // },{
    //     new:true
    // })

    return res
    .status(200)
    .clearCookie("adminAccessToken")
    
    .json( new ApiResponse(200,{},"User logged out"))


})