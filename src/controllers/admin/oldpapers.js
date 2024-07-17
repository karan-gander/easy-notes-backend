import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { fileUploadOnCloud ,getPublicUrl} from "../../utils/GoolgeDrive.js";
import { Paper } from "../../models/oldpapers.js";


export const paperUpload = asyncHandler(async (req,res)=>{
    const {branch,semester}  = req.body
    console.log("HI i am in old papers")
    // console.log("google",req.file)
    const fileObject = req.file
    const fileName = req.file.originalname
    const DESTINATION_FOLDER_ID = '19IVwO6izPpCcGJv-ewC1zG6q1k5TxkGn'

    const response = await fileUploadOnCloud(fileObject,DESTINATION_FOLDER_ID)

    const googleID = response.data.id

    const papersexists = await Paper.findOne({fileName})
    if(papersexists){
        throw new ApiError(401,"Old are already exist")
    }

    console.log("google drive notes respose is here ", response.data)
     
    const url = await getPublicUrl(response.data.id)
    console.log("my url",url.data)


    const paper = await Paper.create({
        branch,
        semester,
        fileName:fileName,
        url:url.data.webViewLink,
        googleID
    })

    console.log(paper)
    res.json(new ApiResponse(200,{paper},"Paper uploaded successfully"))


    

})