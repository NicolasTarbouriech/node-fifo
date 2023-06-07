import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";
import { model } from "mongoose";
import userSchema from "../model/user.model";

export async function getUserMiddleware(req: Request, res: Response, next: Function) {
  const User = model<IUser>('User', userSchema);
  const userId = req.params.userId;
  const user = await User.findOne({
    _id: userId
  });
  if (!user) {
    return res.status(404).json({message: 'User with id : ' + userId + 'not found'});
  }

  req.body.user = user;
  next();
}
