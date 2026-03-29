import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  uploadKYC,
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

export default router;
