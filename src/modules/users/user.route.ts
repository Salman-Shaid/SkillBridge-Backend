import { Router } from "express";
import { registerUser, loginUser, getMe, getStudentDashboard, getMyProfile, updateProfile } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);


router.get("/me", authMiddleware, getMe);

router.get("/dashboard", authMiddleware, getStudentDashboard);

router.get("/profile", authMiddleware, getMyProfile);

router.put("/update-profile", authMiddleware, updateProfile);          

export default router;
