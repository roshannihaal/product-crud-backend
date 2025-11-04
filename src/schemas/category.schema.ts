import { z } from "zod";

const CategorySchema = z.object({
  id: z.uuid(),
  name: z.string().trim(),
  created_by: z.string().trim(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const CreateCategorySchema = z.object({
  body: CategorySchema.pick({ name: true }),
});
export type ICreateCategory = z.infer<typeof CreateCategorySchema>["body"];

export const GetCategorySchema = z.object({
  params: z.object({
    id: z.uuid().trim(),
  }),
});
export type IGetCategory = z.infer<typeof GetCategorySchema>["params"];

export const UpdateCategorySchema = z.object({
  params: GetCategorySchema.shape.params,
  body: CategorySchema.pick({
    name: true,
  }),
});
export type IUpdateCategoryBody = z.infer<typeof UpdateCategorySchema>["body"];
export type IUpdateCategoryParams = z.infer<
  typeof UpdateCategorySchema
>["params"];

export const DeleteCategorySchema = GetCategorySchema;
export type IDeleteCategory = z.infer<typeof DeleteCategorySchema>["params"];
