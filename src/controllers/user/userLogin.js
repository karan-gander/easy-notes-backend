import { ApiError } from "../../utils/ApiError.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from "../../models/users.model.js";
import { generateAccessTokenAndRefreshTOken } from "./genrateAccessTokenAndRefresh.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
const userLogin = asyncHandler(async (req, res) => {
  console.log("hiii");
  const { username, email, password } = req.body;
  // console.log(username, password, email);
  console.log(password);
  if (!(username || email)) {
    throw new ApiError(400, "userneame or email is not found");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(401, "Invaild username or password");
  }

  const isPasswordCorrect = await user.isPasswordCorrect(password);
  console.log(isPasswordCorrect);
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Password is incorrect");
  }
  console.log(user._id);

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshTOken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: false, // Prevent client-side JavaScript access
    secure: false, // Set only for HTTPS connections (if applicable)
    // sameSite: "sameSit", // Allow sending with top-level navigations
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: false, // prevents JavaScript from accessing the cookie
      secure: false, // ensures the cookie is sent over HTTPS
      maxAge: 3600000, // sets the cookie expiry (in ms)
    })
    .json(
      new ApiResponse(
        200,  
        { loggedInUser, accessToken, refreshToken },
        "user is logged in successfully"
      )
    );
});

export { userLogin };
