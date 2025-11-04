import { z } from "zod";

const ProductSchema = z.object({
  id: z.uuid(),
  category_id: z.uuid(),
  name: z.string().trim(),
  image: z.string().trim().optional(),
  price: z.number().min(1),
  created_by: z.string().trim(),
  created_at: z.date(),
  updated_at: z.date(),
});

export const CreateProductSchema = z.object({
  body: ProductSchema.pick({
    name: true,
    image: true,
    category_id: true,
    price: true,
  }),
});
export type ICreateProduct = z.infer<typeof CreateProductSchema>["body"];

export const GetProductSchema = z.object({
  params: z.object({
    id: z.uuid().trim(),
  }),
});
export type IGetProduct = z.infer<typeof GetProductSchema>["params"];

export const UpdateProductSchema = z.object({
  params: GetProductSchema.shape.params,
  body: ProductSchema.pick({
    name: true,
    image: true,
    category_id: true,
    price: true,
  }),
});
export type IUpdateProductBody = z.infer<typeof UpdateProductSchema>["body"];
export type IUpdateProductParams = z.infer<
  typeof UpdateProductSchema
>["params"];

export const DeleteProductSchema = GetProductSchema;
export type IDeleteProduct = z.infer<typeof DeleteProductSchema>["params"];
