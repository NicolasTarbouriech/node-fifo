import { Request, Response } from "express";
import { findActionsByUserId } from "../entity/action/repository/action.repository";

export class ActionController {
  static async getActions(req: Request, res: Response) {
    try {
      const actions = await findActionsByUserId(req.params.userId);
      return res.json(actions);
    } catch (error) {
      console.error("Error adding action to user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
