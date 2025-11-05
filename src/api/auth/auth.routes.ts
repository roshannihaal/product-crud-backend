import { Router } from "express";
import * as controller from "./auth.controller";
import { decrypt, validate } from "../../middlewares";
import { LoginSchema, SignupSchema } from "../../schemas";

const router = Router();

router.post("/signup", decrypt, validate(SignupSchema), controller.signup);
router.post("/login", decrypt, validate(LoginSchema), controller.login);
router.get("/public-key", controller.publicKey);

export const authRouter = router;
