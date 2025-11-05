import { Router } from "express";
import * as controller from "./product.controller";
import { authenticate, csvUpload, upload, validate } from "../../middlewares";
import {
  CreateProductSchema,
  DeleteProductSchema,
  DownloadProductSchema,
  GetAllProductSchema,
  GetProductImageSchema,
  GetProductSchema,
  UpdateProductSchema,
} from "../../schemas";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("image"),
  validate(CreateProductSchema),
  controller.create
);
router.post(
  "/bulk",
  authenticate,
  csvUpload.single("file"),
  controller.createBulk
);
router.get(
  "/all",
  authenticate,
  validate(GetAllProductSchema),
  controller.getAll
);
router.get(
  "/download",
  authenticate,
  validate(DownloadProductSchema),
  controller.download
);
router.get(
  "/:id/image",
  authenticate,
  validate(GetProductImageSchema),
  controller.getImage
);
router.get("/:id", authenticate, validate(GetProductSchema), controller.get);
router.put(
  "/:id",
  authenticate,
  upload.single("image"),
  validate(UpdateProductSchema),
  controller.update
);
router.delete(
  "/:id",
  authenticate,
  validate(DeleteProductSchema),
  controller.deleteProduct
);

export const productRouter = router;
