import { IJwtUser } from "../../schemas";

declare global {
  namespace Express {
    interface Request {
      user?: IJwtUser;
    }
  }
}

export {};
