import { Router } from "express";
import {
  createRental,
  getUserRentals,
  returnLaptop,
  cancelRental,
} from "../controllers/rentalController.js";
import validate from "../middleware/validate.js";
import { createRentalSchema } from "../validators/index.js";
import { protect } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protect, getUserRentals);
router.post("/", protect, validate(createRentalSchema), createRental);
router.put("/:id", protect, returnLaptop);
router.delete("/:id", protect, cancelRental);

export default router;
