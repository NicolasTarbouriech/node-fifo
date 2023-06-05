import { IUser } from "../interface/user.interface";
import { model } from "mongoose";
import userSchema from "../entity/user.entity";
import { IAction } from "../interface/action.interface";
import actionSchema from "../entity/action.entity";
import { Request, Response } from "express";

export class UserController {
  static async  createUser() {
    const User = model<IUser>('User', userSchema);

    const user = new User({
      id: String(Math.floor(Math.random() * 42)),
      email: 'test22@tohero.fr',
      credits: {},
      lastUpdatedAt: new Date(),
      queue: [],
    });

    const query = User.where({ email: 'test3@tohero.fr' });
    const isUser = await query.findOne();

    if (isUser) {
     throw new Error('user already exists');
    }

    for (const type of ['A', 'B', 'C']) {
      user.credits[type] = 0;
    }
    await user.save();

    return user;
  }

  static async addActionUser(req: Request, res: Response) {
    const Action = model<IAction>('Actions', actionSchema);
    const user: IUser = req.body.user;
    const { type } = req.body;

    if (!['A', 'B', 'C'].includes(type)) {
      return res.status(400).json({ message: 'Invalid action type' });
    }

    const action = new Action({
      type,
      credits: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await action.save();

    //user.queue.push(action);
    //await user.save();

    return user;
  }
}

