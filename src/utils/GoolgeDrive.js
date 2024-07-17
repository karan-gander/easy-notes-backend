import { google } from "googleapis"
import { ApiError } from "./ApiError.js";
import { RefreshToken } from "../models/GoogleRefreshToken.js";

import fs from "fs";

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URL = process.env.REDIRECT_URL

const REFRESH_TOKEN = process.env.REFRESH_TOKEN




const auth2Client = new google.auth.OAuth2(
   CLIENT_ID,
   CLIENT_SECRET,
   REDIRECT_URL
  );

  auth2Client.on("tokens",async(token)=>{
    console.log("inside refresh acess")
    if(token.refresh_token){
        console.log(token.refresh_token, "new Refresh token is here ")
        const saveRefreshInNote  = await RefreshToken.create({
            refreshToken:token.refresh_token
        })
        // console.log("refresh save ",saveRefreshInNote)


    }
    // const refreshToken = RefreshToken.find
  //   const saveRefreshInNote  = await RefreshToken.create({
  //     refreshToken
  //   })
  // console.log("refresh save ",saveRefreshInNote)
  //   console.log("new acess token",token.access_token)

    
})

  // Set the refresh token initially
  // const refreshToken = await RefreshToken.findOne({refre})
auth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });



const drive = google.drive({
    version: 'v3',
    auth: auth2Client
  });
  



  export const fileUploadOnCloud = async (fileObject, folderId) => {
    try {
      // await authenticate(); // Ensure authentication before uploading
  
      if (!fileObject || !folderId) {
        throw new ApiError(500, "Could not find the file Object or folderID");
      }
      
      const response = await drive.files.create({
        requestBody:{
            name:fileObject.originalname,
            mimeType:fileObject.mimetype,


        },
        media:{
            mimeType:fileObject.mimetype,
            body:fs.createReadStream(fileObject.path)
        }
      })
    console.log(response.data)
    fs.unlinkSync(fileObject.path); // deleteingfile
      return response;
      
    } catch (error) {
      console.error('Error uploading file:', error.message);
      fs.unlinkSync(fileObject.path); // Delete the uploaded file after an error
      throw new Error('Error uploading file');
    }
  };


export  const getPublicUrl = async (fileId) => {
    try {
      // await authenticate(); // Ensure authentication before fetching public URL
  
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: "reader",
          type: "anyone"
        }
      });
  
      const result = await drive.files.get({
        fileId,
        fields: 'webViewLink, webContentLink'
      });
      // console.log(result)
      return result;
    } catch (error) {
      console.error('Error getting public URL:', error.message);
      throw new Error('Error getting public URL');
    }
  };


