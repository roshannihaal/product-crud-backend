import { z } from "zod";

export const TokenSchema = z.object({
  data: z.object({
    id: z.uuid(),
    email: z.email(),
  }),
  iat: z.number(),
  exp: z.number(),
});
export type IToken = z.infer<typeof TokenSchema>;
