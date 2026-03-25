import { registerUser, loginUser } from "../controllers/userContoller.js";
import { Router } from "express";

const router = Router();

router.post("/register", registerUser).post("/login", loginUser);

export default router;
