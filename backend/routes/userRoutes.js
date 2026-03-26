import {
  registerUser,
  loginUser,
  getUserProfile,
  updateProfile,
} from "../controllers/userContoller.js";

import { protect } from "../middleware/authMiddleware.js";

import { Router } from "express";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .patch(protect, updateProfile);

export default router;
