import { Router } from "express";
import {
  createRental,
  getUserRentals,
  returnLaptop,
  cancelRental,
  adminGetRental,
  getRentalById,
} from "../controllers/rentalController.js";
import validate from "../middleware/validate.js";
import { createRentalSchema } from "../validators/index.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";

const router = Router();

router.get("/", protect, getUserRentals);
router.get("/admin", protect, admin, adminGetRental);
router.get("/:id", protect, getRentalById);
router.post("/", protect, validate(createRentalSchema), createRental);
router.put("/:id", protect, returnLaptop);
router.delete("/:id", protect, cancelRental);

export default router;
