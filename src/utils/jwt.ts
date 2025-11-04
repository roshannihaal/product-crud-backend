import jwt from "jsonwebtoken";
import { IJwtUser, TokenSchema } from "../schemas";
import { config } from "../config";
import { ERROR_RESPONSE } from "./errorResponse";

export const generateJwt = (user: IJwtUser) => {
  const data = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign({ data }, config.JWT_SECRET, {
    expiresIn: config.JWT_VALIDITY,
  });
  return token;
};

export const validateJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const result = TokenSchema.parse(decoded);
    return result;
  } catch (err) {
    throw new Error(
      ERROR_RESPONSE.MISSING_OR_INVALID_AUTHORIZATION_HEADER.code
    );
  }
};
