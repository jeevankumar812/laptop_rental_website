import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
  uploadKYC,
  forgotPassword,
  resetPassword,
} from "../controllers/userContoller.js";
import validate from "../middleware/validate.js";
import {
  registerUserSchema,
  loginUserSchema,
  updateProfileSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/index.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadKYCInfo } from "../middleware/uploadMiddleware.js";
import { Router } from "express";

const router = Router();

router.post("/register", validate(registerUserSchema), registerUser);
router.post("/login", validate(loginUserSchema), loginUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, validate(updateProfileSchema), updateProfile);

router.post(
  "/upload-kyc",
  protect,
  uploadKYCInfo.single("document"),
  uploadKYC,
);
router.post("/forgot-password", validate(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validate(resetPasswordSchema), resetPassword);

export default router;
