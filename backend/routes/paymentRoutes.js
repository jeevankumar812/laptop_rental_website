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
import {
  createOrderSchema,
  verifyPaymentSchema,
  processRefundSchema,
} from "../validators/index.js";
import validate from "../middleware/validate.js";

const router = Router();

// User Routes
router.post("/create-order", protect, validate(createOrderSchema), createOrder);
router.post("/verify", protect, validate(verifyPaymentSchema), verifyPayment);
router.get("/my-history", protect, getPaymentHistory);

// Admin Routes
router.get("/all", protect, admin, getAllPayments);
router.post(
  "/refund/:rentalId",
  protect,
  admin,
  validate(processRefundSchema),
  processRefund,
);

export default router;
