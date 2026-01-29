// src/modules/bookings/booking.validation.ts
import { z } from "zod";

// ✅ Create Booking (studentId comes from JWT)
export const createBookingSchema = z.object({
  body: z.object({
    tutorId: z.string().uuid(),
    availabilityId: z.string().uuid(),
  }),
});

// Update Booking (status only)
export const updateBookingSchema = z.object({
  body: z.object({
    status: z.enum(["CONFIRMED", "COMPLETED", "CANCELLED"]),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});

// Booking ID validation for get/delete
export const bookingIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
