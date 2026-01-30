import { Router } from "express";
import * as adminController from "./admin.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";

const router = Router();

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  adminController.getAdminDashboard
);




router.get("/users", authMiddleware, roleMiddleware("ADMIN"), adminController.getAllUsers);
router.get("/users/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.getUserById);
router.delete("/users/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.deleteUser);

router.patch("/users/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.updateUserStatus);




router.get("/tutors", authMiddleware, roleMiddleware("ADMIN"), adminController.getAllTutors);
router.get("/tutors/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.getTutorById);
router.delete("/tutors/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.deleteTutor);


router.get("/bookings", authMiddleware, roleMiddleware("ADMIN"), adminController.getAllBookings);
router.get("/bookings/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.getBookingById);
router.delete("/bookings/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.deleteBooking);


router.get("/reviews", authMiddleware, roleMiddleware("ADMIN"), adminController.getAllReviews);
router.get("/reviews/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.getReviewById);
router.delete("/reviews/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.deleteReview);


router.get("/categories", authMiddleware, roleMiddleware("ADMIN"), adminController.getAllCategories);
router.get("/categories/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.getCategoryById);
router.delete("/categories/:id", authMiddleware, roleMiddleware("ADMIN"), adminController.deleteCategory);

export default router;
