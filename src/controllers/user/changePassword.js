import { User } from "../../models/users.model.js"
import { ApiError } from "../../utils/ApiError.js"
import { ApiResponse } from "../../utils/ApiResponse.js"
import { asyncHandler } from "../../utils/asyncHandler.js"

export const changePassword = asyncHandler(async (req,res)=>{

    const {oldpassword,newpassword} = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect =  await user.isPasswordCorrect(oldpassword)
    if(!isPasswordCorrect){
        throw new ApiError(401,"Incorrect PAssword")


    }

    user.password = newpassword
    await user.sava({validateBeforeSave:false})

    return res.status(200).json(new ApiResponse(200,"Password change successfully"))

    


})