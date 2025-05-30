import { Router } from "express";
import { signup,login,getUser, updateProfile,addProfileImage,deleteProfileImage, logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from 'multer';
import { storage } from "../middlewares/cloudinary.js";

const authRoutes = Router();
const upload = multer({storage:storage})

authRoutes.post("/signup",signup);
authRoutes.post("/login",login)
authRoutes.get("/user-info",verifyToken ,getUser);
authRoutes.post("/update-profile",verifyToken,updateProfile);
authRoutes.post("/add-profile-image",verifyToken,upload.single("profile-image"),addProfileImage);
authRoutes.delete("/delete-profile-image",verifyToken,deleteProfileImage);
authRoutes.post("/logout",logout);

export default authRoutes;