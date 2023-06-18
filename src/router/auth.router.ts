import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controller/auth.controller";
import userRouter from "./user.router";

const authRouter = Router();

authRouter.post(
  "/sign-in",
  async (req: Request, res: Response, next: NextFunction) => {
    AuthController.signIn(req.body)
      .then((data) => {
        res.json({
          accessToken: data.accessToken,
        });
      })
      .catch(next);
  }
);

// create new user
authRouter.post("/sign-up", async (req: Request, res: Response) => {
  return await AuthController.signUp(req.body, res);
});

export default authRouter;
