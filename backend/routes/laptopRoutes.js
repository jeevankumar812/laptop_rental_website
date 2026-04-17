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
import validate from "../middleware/validate.js";
import { addLaptopSchema, updateLaptopSchema } from "../validators/index.js";

const router = Router();

router.get("/", getAllLaptops);
router.get("/:id", getLaptopById);
router.post(
  "/",
  protect,
  admin,
  uploadLaptop.single("image"),
  validate(addLaptopSchema),
  addLaptop,
);
router.put("/:id", protect, admin, validate(updateLaptopSchema), updateLaptop);
router.delete("/:id", protect, admin, deleteLaptop);
router.get("/availability/:id", checkAvailability);

export default router;
