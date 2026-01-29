// src/modules/categories/category.validation.ts
import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
});

export const categoryIdSchema = z.object({
  id: z.string().uuid("Invalid category id"),
});

// Middleware to validate
export const validate = (schema: any) => (req: any, res: any, next: any) => {
  try {
    const body = req.body;
    const params = req.params;
    schema.parse({ ...body, ...params });
    next();
  } catch (err: any) {
    return res.status(400).json({ message: err.errors });
  }
};
