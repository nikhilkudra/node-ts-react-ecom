import { Router } from "express";
import { signup, login, forgetPassword } from "../controllers/authController";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forget-password", forgetPassword);

export default router;
