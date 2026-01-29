import express from "express";
import * as bookingController from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createBookingSchema, updateBookingSchema, bookingIdSchema } from "./booking.validation";

const router = express.Router();

// ✅ Create booking → only STUDENT
router.post(
  "/",
  authMiddleware,
  roleMiddleware("STUDENT"),
  validate(createBookingSchema),
  bookingController.createBooking
);

// ✅ Get all bookings → ADMIN or tutor
router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "TUTOR"),
  bookingController.getAllBookings
);

// ✅ Get booking by ID → ADMIN, STUDENT, or tutor
router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STUDENT", "TUTOR"),
  validate(bookingIdSchema),
  bookingController.getBookingById
);

// ✅ Update booking status → only ADMIN or tutor
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "TUTOR"),
  validate(updateBookingSchema),
  bookingController.updateBooking
);

// ✅ Delete booking → only ADMIN
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(bookingIdSchema),
  bookingController.deleteBooking
);

export default router;
