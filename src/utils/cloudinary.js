// import {ApiError} from "./ApiError.js"
// import {v2 as cloudinary} from 'cloudinary';
// import fs, { unlinkSync } from "fs"
// cloudinary.config({ 
//     cloud_name: process.env.CLOUD_NAME, 
//     api_key: process.env.CLOUD_API_KEY, 
//     api_secret:process.env.API_SECRET
//   });

 

// const fileUploadOnCloud = async(localPath) =>{

//     try {
//         if(!localPath) return  ApiError(500,"Could not find the file path")

//         const response = await cloudinary.uploader.upload(localPath,{
//             resource_type:"auto",
            
//         })
//         console.log(`file uploaded succesfully ${response.url}`)
//         return response
        
//     } catch (error) {
//         fs.unlinkSync(localPath)
//         return null

//     }

// }
          
// export {fileUploadOnCloud}
