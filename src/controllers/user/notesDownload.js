import { Note } from "../../models/notes.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";




export const notesDownload = asyncHandler(async(req,res)=>{

    const {branch,semester,medium} = req.body
    
    if(!branch && !semester && !medium){
        throw new ApiError(401,"Please select all required fields")
    }

    const notes = await Note.aggregate([
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
            $match: {
              "medium":medium
            }
          },
            {
              $project: {
                fileName:1,
              url:1
              
              }
            }
          
          
        ])

        if(!notes){
            throw new ApiError(401,"notes not found")

        }

        res.status(200)
        .json(new ApiResponse(200,{notes},"notes send sucessfully"))




})