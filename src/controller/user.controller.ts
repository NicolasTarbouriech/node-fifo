import { Request, Response } from "express";
import {
  findUserByEmail,
  findUserById,
  postUser,
} from "../entity/user/repository/user.repository";
import { IUser } from "../entity/user/interface/user.interface";
import { calculateCredits } from "../utils/credits.utils";
import { addActionToUser } from "../entity/action/repository/action.repository";
import { actionTypeValuesMap } from "../entity/action/interface/action.interface";
import { PostUser } from "../entity/user/type/user.type";

export class UserController {
  static async createUser(postedData: PostUser, res: Response) {
    try {
      const user = await postUser(postedData);

      for (const [type, value] of Object.entries(actionTypeValuesMap)) {
        user.credits[type] = calculateCredits(value);
      }

      const isUser = await findUserByEmail(postedData.email);

      if (isUser) {
        throw new Error("user already exists");
      }

      await user.save();

      return res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUser(req: Request, res: Response) {
    try {
      const user = findUserById(req.params.userId);
      return res.json(user);
    } catch (error) {
      console.error("Error adding action to user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async addActionUser(req: Request, res: Response) {
    try {
      const user: IUser = req.body.user;
      const { type } = req.body;

      if (!["A", "B", "C"].includes(type)) {
        return res.status(400).json({ message: "Invalid action type" });
      }

      const action = await addActionToUser(type, user);

      return res.json(action);
    } catch (error) {
      console.error("Error adding action to user", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
