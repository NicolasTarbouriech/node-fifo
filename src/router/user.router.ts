import { Request, Response, Router } from "express";
import { UserController } from "../controller/user.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const userRouter = Router();

// create new user
userRouter.post("/create", async (req: Request, res: Response) => {
  return await UserController.createUser(req.body, res);
});

// retrieve user
userRouter.get(
  "/:userId",
  authenticateJWT,
  async (req: Request, res: Response) => {
  return await UserController.getUser(req, res);
});

// add action to user
userRouter.post(
  "/:userId/actions",
  authenticateJWT,
  async (req: Request, res: Response) => {
    return await UserController.addActionUser(req, res);
  }
);

export default userRouter;
