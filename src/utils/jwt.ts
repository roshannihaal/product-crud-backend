import jwt from "jsonwebtoken";
import { IUser } from "../schemas";
import { config } from "../config";

export const generateJwt = (user: IUser) => {
  const data = {
    id: user.id,
    email: user.email,
    created_at: user.created_at,
  };
  const token = jwt.sign({ data }, config.JWT_SECRET, {
    expiresIn: config.JWT_VALIDITY,
  });
  return token;
};
