import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
// import { fileUploadOnCloud, getPublicUrl } from "../../utils/GoolgeDrive.js";LoadingButton
import { fileUploadOnCloud ,getPublicUrl} from "../../utils/GoolgeDrive.js";
import { Note } from "../../models/notes.js";


export const notesUpload = asyncHandler(async (req,res)=>{
    const {branch,year,semester,subject,medium}  = req.body

    // console.log("google",req.file)
    const fileObject = req.file
    const fileName = req.file.originalname
    const DESTINATION_FOLDER_ID = '19IVwO6izPpCcGJv-ewC1zG6q1k5TxkGn'

    const response = await fileUploadOnCloud(fileObject,DESTINATION_FOLDER_ID)

    const googleID = response.data.id
    console.log("google id res")

    const notesexists = await Note.findOne({fileName})
    if(notesexists){
        throw new ApiError(401,"Notes are already exist")
    }

    // console.log("google drive notes respose is here ", response.data)
     
    const url = await getPublicUrl(response.data.id)
    console.log("my url",url.data)


    const note = await Note.create({
        branch,
        semester,
        subject,
        medium,
        fileName:fileName,
        url:url.data.webViewLink,
        googleID
    })

    console.log(note)
    res.json(new ApiResponse(200,{},"Notes uploaded successfully"))


    

})