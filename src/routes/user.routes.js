import { Router } from "express";
import {userRegister} from "../controllers/user/userRegister.controller.js"
import {userLogin} from "../controllers/user/userLogin.js"
import {logout} from "../controllers/user/userLogout.js"
import {refreshAccessToken} from "../controllers/user/refreshToken.js"
import { changePassword } from "../controllers/user/changePassword.js";
import {updateUserDetails} from "../controllers/user/updateUserDetails.js"
import {getCurruntUser} from "../controllers/user/curruntUser.js"
import { notesDownload } from "../controllers/user/notesDownload.js";
import {verifyJWT} from "../middleware/auth.js"
import { notesUpload } from "../controllers/admin/notesUpload.js";
import {upload} from "../middleware/multer.js"
import { papersDownload } from "../controllers/user/oldPapers.js";


const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin)


//  auth routres
router.route("/logout").post(verifyJWT,logout)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT,changePassword)
router.route("/currunt-user").post(verifyJWT,getCurruntUser)
router.route("/update-account").post(verifyJWT,updateUserDetails)
router.route("/user-details").patch(verifyJWT,getCurruntUser)

router.route("/notes-download").post(verifyJWT,notesDownload)
router.route("/papers-download").post(verifyJWT,papersDownload)

//  notes and old papers routes
//  jwt add karana hai after testig in both routes




export default router