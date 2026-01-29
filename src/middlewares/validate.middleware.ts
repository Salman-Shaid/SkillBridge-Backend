// src/middlewares/validate.middleware.ts
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import { ParamsDictionary } from "express-serve-static-core";

// ✅ Type-safe Zod validation middleware
export const validate = (schema: ZodObject<ZodRawShape>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      // Assign safely
      if (parsed.body) req.body = parsed.body;
      if (parsed.params) req.params = parsed.params as unknown as ParamsDictionary;
      // query is readonly, skip assignment

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        // ZodError এর message safe ভাবে map করা
        const formatted = err.flatten();
        return res.status(400).json({ message: formatted });
      }

      res.status(400).json({ message: (err as Error).message });
    }
  };
};
