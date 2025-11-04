import { Request, Response, NextFunction } from "express";
import { ERROR_RESPONSE } from "../utils";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = err.message as keyof typeof ERROR_RESPONSE;

  let data: {
    message: string;
    status: number;
  };
  if (key in ERROR_RESPONSE) {
    data = ERROR_RESPONSE[key];
  } else {
    data = {
      message: err.message,
      status: 500,
    };
  }

  const response = {
    message: data.message,
    name: err.name,
    stack: err.stack,
  };

  res.status(data.status).send(response);
};
