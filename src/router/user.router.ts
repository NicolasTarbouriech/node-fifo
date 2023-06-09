import { Request, Response, Router } from "express";
import { UserController } from "../controller/user.controller";
import { getUserMiddleware } from "../middleware/user.middleware";

const userRouter = Router();

// create new user
userRouter.post('/create', async (req: Request, res: Response) => {
   return  await UserController.createUser(req.body, res);
});

// retrieve user
userRouter.get('/:userId', async (req: Request, res: Response) => {
    return await UserController.getUser(req, res);
});

// add action to user
userRouter.post('/:userId/actions', getUserMiddleware, async (req: Request, res: Response) => {
    return await UserController.addActionUser(req, res);
});

export default userRouter;
