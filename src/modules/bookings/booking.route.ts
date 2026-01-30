import express from "express";
import * as bookingController from "./booking.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { createBookingSchema, updateBookingSchema, bookingIdSchema } from "./booking.validation";

const router = express.Router();


router.post(
  "/",
  authMiddleware,
  roleMiddleware("STUDENT"),
  validate(createBookingSchema),
  bookingController.createBooking
);


router.get(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN", "TUTOR"),
  bookingController.getAllBookings
);


router.get(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "STUDENT", "TUTOR"),
  validate(bookingIdSchema),
  bookingController.getBookingById
);


router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN", "TUTOR"),
  validate(updateBookingSchema),
  bookingController.updateBooking
);


router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  validate(bookingIdSchema),
  bookingController.deleteBooking
);

export default router;
