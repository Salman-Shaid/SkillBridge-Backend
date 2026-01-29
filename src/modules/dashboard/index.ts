import { Router } from "express";
import dashboardRoutes from "./dashboard.routes"; // path ঠিক থাকলে
// অন্য existing module routes এখানে import করো যেমন authRoutes, userRoutes ইত্যাদি

const router = Router();

// Example: অন্য routes
// router.use("/auth", authRoutes);
// router.use("/users", userRoutes);

// Dashboard route যোগ করা
router.use("/dashboard", dashboardRoutes);

export default router;