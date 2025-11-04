import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  password: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});
export type IUser = z.infer<typeof UserSchema>;

export const JwtUserSchema = UserSchema.pick({ id: true, email: true });
export type IJwtUser = z.infer<typeof JwtUserSchema>;

export const SignupSchema = z.object({
  body: UserSchema.pick({
    email: true,
    password: true,
  }).extend({
    confirm_password: z.string().min(8).max(24),
  }),
});
export type ISignup = z.infer<typeof SignupSchema>["body"];

export const LoginSchema = z.object({
  body: UserSchema.pick({
    email: true,
    password: true,
  }),
});
export type ILogin = z.infer<typeof LoginSchema>["body"];
