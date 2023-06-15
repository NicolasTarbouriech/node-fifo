import { Request, Response, Router } from "express";
import { ActionController } from "../controller/action.controller";
import { getUserMiddleware } from "../middleware/user.middleware";

const actionRouter = Router();

// retrieve actions
actionRouter.get(
  "/:userId",
  getUserMiddleware,
  async (req: Request, res: Response) => {
  return await ActionController.getActions(req, res);
});

export default actionRouter;
