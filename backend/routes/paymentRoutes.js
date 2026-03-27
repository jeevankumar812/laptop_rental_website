import { Router } from "express";
import {
  createOrder,
  verifyPayment,
  getPaymentHistory,
  processRefund,
  getAllPayments,
} from "../controllers/paymentController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = Router();

// User Routes
router.post("/create-order", protect, createOrder);
router.post("/verify", protect, verifyPayment);
router.get("/my-history", protect, getPaymentHistory);

// Admin Routes
router.get("/all", protect, admin, getAllPayments);
router.post("/refund/:rentalId", protect, admin, processRefund);

export default router;
