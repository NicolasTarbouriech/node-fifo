import { Request, Response, Router } from "express";
import { UserController } from "../controller/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { validateType } from "../middleware/validator.middleware";

const userRouter = Router();

// retrieve user
userRouter.get(
  "/:userId",
  authenticateJWT,
  async (req: Request, res: Response) => {
    return await UserController.getUser(req, res);
  }
);

// add action to user
userRouter.post(
  "/:userId/actions",
  validateType,
  authenticateJWT,
  async (req: Request, res: Response) => {
    return await UserController.addActionUser(req, res);
  }
);

export default userRouter;
