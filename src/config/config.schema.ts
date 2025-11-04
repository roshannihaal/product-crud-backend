import { z } from "zod";

export const configSchema = z.object({
  PORT: z.coerce.number(),
});
