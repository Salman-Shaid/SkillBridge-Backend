import { Router } from "express";
import {
  handleCreateOrUpdateProfile,
  handleGetTutorProfileByUserId,
  handleGetAllTutors,
   handleAddAvailability,
} from "./tutor.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { getTutorDashboard } from "../dashboard/dashboard.controller";
const router = Router();

// Create or update tutor profile
router.post("/profile", handleCreateOrUpdateProfile); // upsertTutorProfile

// Get tutor profile by userId
router.get("/profile/:userId", handleGetTutorProfileByUserId); // getMyProfile

// Add availability
router.post("/availability", handleAddAvailability);

// Get all tutors
router.get("/", handleGetAllTutors); // listTutors

// Tutor dashboard route
router.get("/dashboard", authMiddleware, roleMiddleware("TUTOR"), getTutorDashboard);


export default router;
