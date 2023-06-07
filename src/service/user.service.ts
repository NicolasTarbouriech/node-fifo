import { calculateCredits } from "../utils/credits.utils";
import { IUser } from "../interface/user.interface";
import { Request, Response } from "express";
import { model } from "mongoose";
import userSchema from "../model/user.model";
import { findUserByEmail } from "../repository/user.repository";
import { IAction } from "../interface/action.interface";
import actionSchema from "../model/action.model";
import { PostUser } from "../type/user.type";

export async function createUser(postedData: PostUser) {
  // specify key as string & value as number
  const actionCreditMaxValues: Record<string, number> = {
    'A': 20,
    'B': 20,
    'C': 30,
  };

  const User = model<IUser>('User', userSchema);

  const user = new User({
    id: String(Math.floor(Math.random() * 42)),
    email: postedData.email,
    credits: {},
    lastUpdatedAt: new Date(),
    queue: [],
  });

  for (const type in actionCreditMaxValues) {
    user.credits[type] = calculateCredits(actionCreditMaxValues[type]);
  }

  const isUser = await findUserByEmail(postedData.email);

  if (isUser) {
    throw new Error('user already exists');
  }

  await user.save();

  return user;
}

export async function addActionUser(req: Request, res: Response) {
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
