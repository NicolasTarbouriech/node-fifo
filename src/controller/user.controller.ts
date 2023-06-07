import { IUser } from "../interface/user.interface";
import { model } from "mongoose";
import { Request, Response } from "express";
import userSchema from "../model/user.model";
import { addActionUser, createUser } from "../service/user.service";
import { PostUser } from "../type/user.type";

export class UserController {
  static async createUser(postedData: PostUser) {
    return createUser(postedData);
  }

  static async getUser(req: Request) {
    const User = model<IUser>('User', userSchema);
    const userId = req.params.userId;
    return User.findOne({
      _id: userId
    });
  }

  static async addActionUser(req: Request, res: Response) {
    return addActionUser(req, res);
  }
}

