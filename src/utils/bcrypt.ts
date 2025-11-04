import bcrypt from "bcrypt";
import { config } from "../config";

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(config.SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const validatePassword = (password: string, hash: string) => {
  const valid = bcrypt.compareSync(password, hash);
  return valid;
};
