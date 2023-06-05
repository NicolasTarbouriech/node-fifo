import { Router } from 'express';
import userRouter from './user.router';
import pingRouter from "./ping.router";

const router = Router();

router.use('/user', userRouter);
router.use('/', pingRouter);

export default router;
