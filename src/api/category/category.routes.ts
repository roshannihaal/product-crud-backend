import { Router } from "express";
import * as controller from "./category.controller";
import { authenticate, validate } from "../../middlewares";
import {
  CreateCategorySchema,
  DeleteCategorySchema,
  GetCategorySchema,
  PaginationSchema,
  UpdateCategorySchema,
} from "../../schemas";

const router = Router();

router.post(
  "/",
  authenticate,
  validate(CreateCategorySchema),
  controller.create
);
router.get("/all", authenticate, validate(PaginationSchema), controller.getAll);
router.get("/:id", authenticate, validate(GetCategorySchema), controller.get);
router.put(
  "/:id",
  authenticate,
  validate(UpdateCategorySchema),
  controller.update
);
router.delete(
  "/:id",
  authenticate,
  validate(DeleteCategorySchema),
  controller.deleteCategory
);

export const categoryRouter = router;
