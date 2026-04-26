import { Router } from "express";
import {
  addReview,
  getLaptopReviews,
  getUserReviews,
  deleteReview,
  getAllReviews,
  getReviewByRental,
  updateReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { addReviewSchema } from "../validators/index.js";
import validate from "../middleware/validate.js";

const router = Router();

router.post("/", protect, validate(addReviewSchema), addReview);

router.get("/my-reviews", protect, getUserReviews);

router.get("/all", protect, admin, getAllReviews);

router.get("/laptop/:laptopId", getLaptopReviews);
router.get("/rental/:rentalId", protect, getReviewByRental);

router.put("/:id", protect, updateReview);
router.delete("/:id", protect, admin, deleteReview);

export default router;
