import { Request, Response } from "express";
import {
  findUserById,
} from "../entity/user/repository/user.repository";
import { IUser } from "../entity/user/interface/user.interface";
import { addActionToUser } from "../entity/action/repository/action.repository";


export class UserController {
  static async getUser(req: Request, res: Response) {
    try {
      const user: IUser = await findUserById(req.params.userId);
      return res.json(user);
    } catch (error) {
      console.error("Error adding action to user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addActionUser(req: Request, res: Response) {
    try {
      const user: IUser = res.locals.user;
      const { type } = req.body;

      if (!["A", "B", "C"].includes(type)) {
        return res.status(400).json({ message: "Invalid action type" });
      }

      const action = await addActionToUser(type, user._id);

      return res.json(action);
    } catch (error) {
      console.error("Error adding action to user", error);
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
