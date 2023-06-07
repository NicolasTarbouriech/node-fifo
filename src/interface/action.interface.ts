import { Document } from "mongodb";
import { Model } from "mongoose";
import { IUser } from "./user.interface";

export interface IAction extends Document {
  type: 'A' | 'B' | 'C';
  credits: Number;
  createdAt?: Date;
  updatedAt?: Date;
  owner: IUser
}

export interface IActionModel extends Model<IAction> {}
