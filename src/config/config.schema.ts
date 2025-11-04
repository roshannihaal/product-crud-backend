import { z } from "zod";

export const configSchema = z.object({
  PORT: z.coerce.number(),
  DATABASE_URL: z.string().trim(),
  SALT_ROUNDS: z.coerce.number(),
});
