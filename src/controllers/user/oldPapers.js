
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { Paper } from "../../models/oldpapers.js";




export const papersDownload = asyncHandler(async(req,res)=>{

    const {branch,semester} = req.body
    
    if(!branch && !semester ){
        throw new ApiError(401,"Please select all required fields")
    }

    const papers = await Paper.aggregate([
        {
          $match: {
            "branch":branch
          }
        },
          {
            $match: {
              "semester":semester
            }
          },
          
            {
              $project: {
                fileName:1,
              url:1
              
              }
            }
          
          
        ])

        if(!papers){
            throw new ApiError(401,"Old Papers are  not found")

        }

        res.status(200)
        .json(new ApiResponse(200,{papers},"Old Papers send sucessfully"))




})