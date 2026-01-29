import { z } from "zod";

// ===============================
// Create Review Schema
// ===============================
export const createReviewSchema = z.object({
  body: z.object({
    studentId: z.string().uuid(),
    tutorId: z.string().uuid(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(5).max(300),
  }),
});

// ===============================
// Update Review Schema
// ===============================
export const updateReviewSchema = z.object({
  body: z.object({
    rating: z.number().min(1).max(5).optional(),
    comment: z.string().min(5).max(300).optional(),
  }),
});

// ===============================
// Zod validation middleware
// ===============================
export const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    schema.parse({ body: req.body, params: req.params, query: req.query });
    next();
  } catch (err: any) {
    return res.status(400).json({ errors: err.errors });
  }
};
