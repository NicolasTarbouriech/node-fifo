import { Request, Response } from "express";
import { findUserById } from "../entity/user/repository/user.repository";

export async function getUserMiddleware(
  req: Request,
  res: Response,
  next: Function
) {
  const { userId } = req.params;
  const user = await findUserById(userId);

  if (!user) {
    return res
      .status(404)
      .json({ message: "User with id : " + userId + "not found" });
  }

  req.body.user = user;
  next();
}
