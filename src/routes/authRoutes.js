import { Router } from "express";
import { signupController, loginController } from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/signup", signupController);
authRoutes.post("/login", loginController);

export default authRoutes;