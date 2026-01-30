import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import {
  studentDashboard,
  adminDashboard,
  getTutorDashboard
} from "./dashboard.controller";

const router = Router();


router.get("/student", authMiddleware, studentDashboard);


router.get("/tutor", authMiddleware, roleMiddleware("TUTOR"), getTutorDashboard);


router.get("/admin", authMiddleware, roleMiddleware("ADMIN"), adminDashboard);

export default router;
