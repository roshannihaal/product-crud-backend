import { UserRepository } from "../../repositories";
import { ILogin, ISignup } from "../../schemas";
import { Request, Response, NextFunction } from "express";
import { ERROR_RESPONSE, validatePassword } from "../../utils";

export const signup = async (
  req: Request<unknown, unknown, ISignup>,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const userRepository = new UserRepository();
  try {
    const result = await userRepository.create(body);
    const response = {
      message: "User created successfully",
      data: result,
    };
    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request<unknown, unknown, ILogin>,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const userRepository = new UserRepository();
  try {
    const user = await userRepository.get(body.email);
    if (!user) {
      throw new Error(ERROR_RESPONSE.INVALID_EMAIL_OR_PASSWORD.code);
    }
    const isValidPassword = validatePassword(body.password, user.password);
    if (!isValidPassword) {
      throw new Error(ERROR_RESPONSE.INVALID_EMAIL_OR_PASSWORD.code);
    }
    const response = {
      message: "user logged in",
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
