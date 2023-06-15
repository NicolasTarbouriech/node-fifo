import { Request, Response, Router } from "express";
import { ActionController } from "../controller/action.controller";
import { authenticateJWT } from "../middleware/auth.middleware";

const actionRouter = Router();

// retrieve actions
actionRouter.get(
  "/:userId",
  authenticateJWT,
  async (req: Request, res: Response) => {
  return await ActionController.getActions(req, res);
});

export default actionRouter;
