import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import {
  studentDashboard,
  adminDashboard,
  getTutorDashboard
} from "./dashboard.controller";

const router = Router();

// Student dashboard
router.get("/student", authMiddleware, studentDashboard);

// Tutor dashboard
router.get("/tutor", authMiddleware, roleMiddleware("TUTOR"), getTutorDashboard);

// Admin dashboard
router.get("/admin", authMiddleware, roleMiddleware("ADMIN"), adminDashboard);

export default router;
