import { z } from "zod";

// Create or update tutor profile
export const tutorProfileSchema = z.object({
  bio: z.string().min(10, "Bio must be at least 10 characters").optional(),
  categoryId: z.string().optional(),
  subjects: z.array(z.string()).min(1, "At least one subject is required"),
});

// Availability schema
export const availabilitySchema = z.object({
  date: z.string(), // ISO string
  startTime: z.string(),
  endTime: z.string(),
});
