import { Router } from "express";
import * as controller from "./auth.controller";
import { validate } from "../../middlewares";
import { LoginSchema, SignupSchema } from "../../schemas";

const router = Router();

router.post("/signup", validate(SignupSchema), controller.signup);
router.post("/login", validate(LoginSchema), controller.login);

export const authRouter = router;
