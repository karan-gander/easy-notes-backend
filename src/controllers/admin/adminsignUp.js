import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Admin } from "../../models/admin.js";
import { ApiResponse } from "../../utils/ApiResponse.js";


export const adminsignUp = asyncHandler(async(req,res)=>{

    const {adminId,password} = req.body
    
    if(!adminId && !password){
        throw new ApiError(401,"adminId and password are required")
    }

    const admin = await Admin.create({
        adminId,
        password
    })
    if(!admin){
        throw new ApiError(500,"something went wront while creating admin account")
    }
    res.status(200)
    .json(new ApiResponse(200,{admin},"admin create successfully"))
})