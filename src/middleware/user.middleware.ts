import { Request, Response } from "express";
import { IUser } from "../interface/user.interface";

export function getUserMiddleware(req: Request, res: Response, next: Function) {
  const users: IUser[] = [];
  const userId = req.params.userId;
  console.log(req);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User tarbounix not found' });
  }

  req.body.user = user;
  next();
}
