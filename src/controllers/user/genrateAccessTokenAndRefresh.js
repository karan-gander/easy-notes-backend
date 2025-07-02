import { User } from "../../models/users.model.js";
import { ApiError } from "../../utils/ApiError.js";
const generateAccessTokenAndRefreshTOken = async (userId) => {
  try {
    const user = await User.findById(userId);
    console.log("in User",user)
    const accessToken = await user.generateAccessToken();
    console.log("aa ---",accessToken)
    const refreshToken = await user.generateRefreshToken();
    console.log("refresh Token ,",refreshToken)
    user.refreshToken = refreshToken;
   await  user.save({validateBeforeSave:false})
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "something went wrong wihle genreting tokens", error);
  }
};

export {generateAccessTokenAndRefreshTOken}
