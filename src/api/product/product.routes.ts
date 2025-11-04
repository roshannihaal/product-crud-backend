import { Router } from "express";
import * as controller from "./product.controller";
import { authenticate } from "../../middlewares";

const router = Router();

router.post("/", authenticate, controller.create);
router.get("/all", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.get);
router.put("/:id", authenticate, controller.update);
router.delete("/:id", authenticate, controller.deleteProduct);

export const productRouter = router;
