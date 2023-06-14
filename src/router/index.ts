import { Router } from "express";
import userRouter from "./user.router";
import pingRouter from "./ping.router";
import actionRouter from "./action.router";

const router = Router();

router.use("/user", userRouter);
router.use("/action", actionRouter);
router.use("/", pingRouter);

export default router;
