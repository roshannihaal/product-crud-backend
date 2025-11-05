import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate =
  (schema: z.ZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schema.shape.body) {
        req.body = await schema.shape.body.parseAsync(req.body);
      }

      if (schema.shape.query) {
        Object.defineProperty(req, "query", {
          value: { ...req.query },
          writable: true,
          enumerable: true,
          configurable: true,
        });

        req.query = await schema.shape.query.parseAsync(req.query);
      }

      if (schema.shape.params) {
        req.params = await schema.shape.params.parseAsync(req.params);
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        err.message = err.issues.map((issue) => issue.message).join(", ");
        res.status(400);
      }
      next(err);
    }
  };
