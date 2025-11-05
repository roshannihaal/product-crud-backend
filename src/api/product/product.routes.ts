import { Router } from "express";
import * as controller from "./product.controller";
import { authenticate, csvUpload, upload } from "../../middlewares";

const router = Router();

router.post("/", authenticate, upload.single("image"), controller.create);
router.post(
  "/bulk",
  authenticate,
  csvUpload.single("file"),
  controller.createBulk
);
router.get("/all", authenticate, controller.getAll);
router.get("/download", authenticate, controller.download);
router.get("/:id/image", authenticate, controller.getImage);
router.get("/:id", authenticate, controller.get);
router.put("/:id", authenticate, upload.single("image"), controller.update);
router.delete("/:id", authenticate, controller.deleteProduct);

export const productRouter = router;
