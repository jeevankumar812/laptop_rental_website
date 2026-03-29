import { Router } from "express";
import {
  getAllLaptops,
  getLaptopById,
  addLaptop,
  updateLaptop,
  deleteLaptop,
  checkAvailability,
} from "../controllers/laptopController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";
import { uploadLaptop } from "../middleware/uploadMiddleware.js";

const router = Router();

router.get("/", getAllLaptops);
router.get("/:id", getLaptopById);
router.post("/", protect, admin, uploadLaptop.single("image"), addLaptop);
router.put("/:id", updateLaptop);
router.delete("/:id", deleteLaptop);
router.get("/availability/:id", checkAvailability);

export default router;
