import { z } from "zod";

export const PaginationSchema = z.object({
  query: z.object({
    limit: z.string().default("10"),
    offset: z.string().default("0"),
  }),
});
export type IPagination = z.infer<typeof PaginationSchema>["query"];
