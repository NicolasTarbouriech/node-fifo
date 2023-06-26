import { NextFunction, Request, Response, Router } from "express";
import { AuthController } from "../controller/auth.controller";
import { body, validationResult } from "express-validator";

const authRouter = Router();

authRouter.post(
  "/sign-in",
  body("email").isEmail(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid email format" });
    }
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
authRouter.post(
  "/sign-up",
  body("email").isEmail(),
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    return await AuthController.signUp(req.body, res);
  }
);

export default authRouter;
