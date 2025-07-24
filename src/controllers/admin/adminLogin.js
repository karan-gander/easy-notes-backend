import { Admin } from "../../models/admin.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { generateAdminAccesToken } from "./genrateAdminAccess.js";


export const adminLogin = asyncHandler(async (req, res) => {

    const { adminId, password } = req.body

    if (!adminId && !password) {
        throw new ApiError(401, "adminId or password required")

    }

    const admin = await Admin.findOne({ adminId })
    console.log(admin)
    if (!admin) {
        throw new ApiError(401, "AdminID is not found")

    }
    const isPasswordCorrect = admin.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        throw new ApiError(401, "incrroct password")
    }

    const {adminAccessToken} =  await generateAdminAccesToken(admin._id)
    // req.session.adminId = admin._id;
    

    
    // console.log(req.session.adminId,"OKKK--")


    res.status(200).cookie("adminAccessToken",adminAccessToken).json(new ApiResponse(200, { admin }, "admin is logged in successfully"))
})