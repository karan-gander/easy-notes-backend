import { adminsignUp } from "../controllers/admin/adminsignUp.js";
import { adminLogin } from "../controllers/admin/adminLogin.js";
import { adminLogout } from "../controllers/admin/adminLogout.js";
import { Router } from "express";
import { notesUpload } from "../controllers/admin/notesUpload.js";
import { paperUpload } from "../controllers/admin/oldpapers.js";
import {verifyJWT} from "../controllers/admin/middleware/auth.js"
import { upload } from "../middleware/multer.js";
import { protectedRoute } from "../controllers/admin/middleware/adminauth.js";
const router = Router()


router.route("/me").get(protectedRoute);
router.route("/register").post(adminsignUp)
router.route("/login").post(adminLogin)
router.route("/logout").post(adminLogout)
router.route("/upload-notes").post(upload.single("notes"),notesUpload)
router.route("/upload-oldpapers").post(upload.single("paper"),paperUpload)
export default router