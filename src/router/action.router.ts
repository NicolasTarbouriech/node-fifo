import { Request, Response, Router } from "express";
import { ActionController } from "../controller/action.controller";

const actionRouter = Router();

// retrieve actions
actionRouter.get("/:userId", async (req: Request, res: Response) => {
  return await ActionController.getActions(req, res);
});

export default actionRouter;
