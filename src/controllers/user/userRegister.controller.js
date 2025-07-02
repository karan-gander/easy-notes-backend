import { asyncHandler } from "../../utils/asyncHandler.js";
import {ApiError} from "../../utils/ApiError.js"
import {ApiResponse} from "../../utils/ApiResponse.js"
import {User} from "../../models/users.model.js"
// import {fileUploadOnCloud} from "../../utils/googleDrive.js"
const userRegister = asyncHandler(async (req,res)=>{
    // res.status(200).json({message:"Api is working well"})
    const {password,fullName,email} = req.body
     console.log(fullName,password,email)

    if([password,email].some((field)=>(field.trim() === "")))
    {
        throw new ApiError(401,"All field are required");
    }
    

    const excitedUser = await User.findOne({email})
    if(excitedUser){
        throw new ApiError(500,"User is already register");
    }

   
    
   const user =  await User.create({
        password,
        email,
        fullName,
        
    })


    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while registering an user")
    }

    return res.status(201).json(new ApiResponse(200,createdUser,"user created successfully"))



    

})

export {userRegister}