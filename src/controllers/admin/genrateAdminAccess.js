import { Admin } from "../../models/admin.js";
import { ApiError } from "../../utils/ApiError.js";
const generateAdminAccesToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    // console.log("in User",user)
    const adminAccessToken = await admin.generateAccessToken();
    console.log("aa ---",adminAccessToken)
    // const refreshToken = await user.generateRefreshToken();
    // console.log("refresh Token ,",refreshToken)
    // user.refreshToken = refreshToken;
//    await  admin.save({validateBeforeSave:false})
    return { adminAccessToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong wihle genreting tokens", error);
  }
};

export {generateAdminAccesToken}
