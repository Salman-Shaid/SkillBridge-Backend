import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    tutorId: z.string().uuid(),
    availabilityId: z.string().uuid(),
  }),
});


export const updateBookingSchema = z.object({
  body: z.object({
    status: z.enum(["CONFIRMED", "COMPLETED", "CANCELLED"]),
  }),
  params: z.object({
    id: z.string().uuid(),
  }),
});


export const bookingIdSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
});
