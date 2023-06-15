import { Router } from "express";
import userRouter from "./user.router";
import pingRouter from "./ping.router";
import actionRouter from "./action.router";
import authRouter from "./auth.router";

const router = Router();

router.use("/user", userRouter);
router.use("/action", actionRouter);
router.use("/auth", authRouter);
router.use("/", pingRouter);

export default router;
