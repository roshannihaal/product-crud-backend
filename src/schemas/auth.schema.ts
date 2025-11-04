import { z } from "zod";

export const SignupSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8).max(24),
    confirm_password: z.string().min(8).max(24),
  }),
});
export type ISignup = z.infer<typeof SignupSchema>["body"];

export const LoginSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
});
export type ILogin = z.infer<typeof LoginSchema>["body"];
