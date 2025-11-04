import { Router } from "express";
import { authRouter } from "./auth";
import { categoryRouter } from "./category";
import { productRouter } from "./product";

const router = Router();

router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use("/product", productRouter);

export const apiRouter = router;
