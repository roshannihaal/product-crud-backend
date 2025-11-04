import { Request, Response, NextFunction } from "express";
import { ERROR_RESPONSE, validateJwt } from "../utils";
import { IJwtUser } from "../schemas";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error(
        ERROR_RESPONSE.MISSING_OR_INVALID_AUTHORIZATION_HEADER.code
      );
    }
    const token = authHeader.split(" ")[1];

    const decoded = validateJwt(token);

    const user: IJwtUser = {
      email: decoded.data.email,
      id: decoded.data.id,
    };

    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};
