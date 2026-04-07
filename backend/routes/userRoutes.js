import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  uploadKYC,
  forgotPassword,
  resetPassword,
} from "../controllers/userContoller.js";

import { protect } from "../middleware/authMiddleware.js";
import { uploadKYCInfo } from "../middleware/uploadMiddleware.js";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateProfile);

router.post(
  "/upload-kyc",
  protect,
  uploadKYCInfo.single("document"),
  uploadKYC,
);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
