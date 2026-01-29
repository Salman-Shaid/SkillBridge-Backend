import { Router } from "express";
import reviewRoutes from "../modules/reviews/review.route";
import bookingRoutes from "../modules/bookings/booking.route";
import categoryRoutes from "../modules/categories/category.route";
import adminRoutes from "../modules/admin/admin.route";
import authRoutes from "../modules/auth/auth.route";
import tutorRoutes from "../modules/tutors/tutor.route"; // ✅ tutors
import usersRoutes from "../modules/users/user.route";
import dashboardRoutes from "../modules/dashboard/dashboard.routes";


const router = Router();

// Public routes
router.use("/auth", authRoutes); // register/login
router.use("/categories", categoryRoutes); // categories list
router.use("/tutors", tutorRoutes); // list tutors, get tutor profile
router.use("/reviews", reviewRoutes); // create reviews

// Booking routes
router.use("/bookings", bookingRoutes); // create/get bookings

// User routes
router.use("/users", usersRoutes); // ✅ এই লাইনটা অবশ্যই থাকতে হবে
// Admin routes
router.use("/admin", adminRoutes); // manage users, bookings, 


router.use("/dashboard", dashboardRoutes);


export default router;