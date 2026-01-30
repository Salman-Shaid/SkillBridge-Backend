
import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import { ParamsDictionary } from "express-serve-static-core";


export const validate = (schema: ZodObject<ZodRawShape>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      
      if (parsed.body) req.body = parsed.body;
      if (parsed.params) req.params = parsed.params as unknown as ParamsDictionary;
      

      next();
    } catch (err) {
      if (err instanceof ZodError) {
    
        const formatted = err.flatten();
        return res.status(400).json({ message: formatted });
      }

      res.status(400).json({ message: (err as Error).message });
    }
  };
};
