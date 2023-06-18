import { Document } from "mongodb";
import { IAction } from "../../action/interface/action.interface";
import { Model } from "mongoose";

export interface IUser extends Document {
  email: string;
  credits: {
    [key: string]: number;
  };
  queue: IAction[];
  lastActionDeletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserModel extends Model<IUser> {}
