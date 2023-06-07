import { IUser } from "../interface/user.interface";
import { model } from "mongoose";
import { IAction } from "../interface/action.interface";
import { Request, Response } from "express";
import userSchema from "../model/user.model";
import actionSchema from "../model/action.model";
import { calculateCredits } from "../utils/credits.utils";

export class UserController {
  static async createUser(req: Request) {
    const User = model<IUser>('User', userSchema);

    // specify key as string & value as number
    const actionCreditMaxValues: Record<string, number> = {
      'A': 20,
      'B': 20,
      'C': 30,
    };

    const user = new User({
      id: String(Math.floor(Math.random() * 42)),
      email: req.body.email,
      credits: {},
      lastUpdatedAt: new Date(),
      queue: [],
    });

    for (const type in actionCreditMaxValues) {
      user.credits[type] = calculateCredits(actionCreditMaxValues[type]);
    }

    const query = User.where({email: req.body.email});
    const isUser = await query.findOne();

    if (isUser) {
      throw new Error('user already exists');
    }

    await user.save();

    return user;
  }

  static async getUser(req: Request) {
    const User = model<IUser>('User', userSchema);
    const userId = req.params.userId;
    return User.findOne({
      _id: userId
    });
  }

  static async addActionUser(req: Request, res: Response) {
    const Action = model<IAction>('Actions', actionSchema);
    const user: IUser = req.body.user;
    const { type } = req.body;

    if (!['A', 'B', 'C'].includes(type)) {
      return res.status(400).json({message: 'Invalid action type'});
    }

    const action = new Action({
      type,
      credits: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner: user
    });

    await action.save();

    user.queue.push(action.id);
    await user.save();

    return res.json(action);
  }
}

