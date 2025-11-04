import { Router } from "express";
import * as controller from "./category.controller";
import { authenticate } from "../../middlewares";

const router = Router();

router.post("/", authenticate, controller.create);
router.get("/all", authenticate, controller.getAll);
router.get("/:id", authenticate, controller.get);
router.put("/:id", authenticate, controller.update);
router.delete("/:id", authenticate, controller.deleteCategory);

export const categoryRouter = router;
