import { UserRepository } from "../../repositories";
import { ILogin, ISignup } from "../../schemas";
import { Request, Response, NextFunction } from "express";
import { ERROR_RESPONSE, generateJwt, validatePassword } from "../../utils";

export const signup = async (
  req: Request<unknown, unknown, ISignup>,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;
  const userRepository = new UserRepository();
  try {
    const result = await userRepository.create(body);
    const user = {
      id: result.id,
      email: result.email,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
    const response = {
      message: "User created successfully",
      data: { user, token: generateJwt(result) },
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
    const result = await userRepository.get(body.email);
    if (!result) {
      throw new Error(ERROR_RESPONSE.INVALID_EMAIL_OR_PASSWORD.code);
    }
    const isValidPassword = validatePassword(body.password, result.password);
    if (!isValidPassword) {
      throw new Error(ERROR_RESPONSE.INVALID_EMAIL_OR_PASSWORD.code);
    }
    const user = {
      id: result.id,
      email: result.email,
      created_at: result.created_at,
      updated_at: result.updated_at,
    };
    const response = {
      message: "User logged in",
      data: { user, token: generateJwt(result) },
    };
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};
