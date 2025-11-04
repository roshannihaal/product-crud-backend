import { Request, Response, NextFunction } from "express";
import { ERROR_RESPONSE } from "../utils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = err.message as keyof typeof ERROR_RESPONSE;
  const data = ERROR_RESPONSE[key];
  const response = {
    message: data.message,
    name: err.name,
    stack: err.stack,
  };

  res.status(data.status).send(response);
};
