import { Router } from "express";
import { registerUser, loginUser, getMe, getStudentDashboard, getMyProfile, updateProfile } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

// Auth routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", authMiddleware, getMe);
router.get("/dashboard", authMiddleware, getStudentDashboard); // Student dashboard overview
router.get("/profile", authMiddleware, getMyProfile);           // Get current profile
router.put("/update-profile", authMiddleware, updateProfile);          // Update profile

export default router;
