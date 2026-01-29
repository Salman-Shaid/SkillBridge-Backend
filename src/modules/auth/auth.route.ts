// src/modules/auth/auth.route.ts
import { Router } from "express";
import { register, login, getMe } from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// ✅ Public routes
router.post("/register", register);
router.post("/login", login);

// ✅ Protected route
router.get("/me", authMiddleware, getMe);

export default router;

