import { User } from "../../models/users.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiResponse} from "../../utils/ApiResponse.js"
 export const updateUserDetails = asyncHandler(async (req,res)=>{
    
    const {fullName,email} = req.body;

    if(!fullName || email){
        throw new ApiError(401,"email or fullname is required")

    }

    const user = await User.findByIdAndUpdate(
                req.user?._id,
                {
                    $set:{
                        email,
                        fullName
                    }
                },
                {
                    new:true
                }

    ).select("-password")

    res.status(200).json(new ApiResponse(200,user,"Account Updated Successfully"))


})