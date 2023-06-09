import { Document } from "mongodb";
import { Model } from "mongoose";
import { IUser } from "../../user/interface/user.interface";
import { TypeAction } from "../../../type/action.type";

export interface IAction extends Document {
  type: TypeAction;
  credits: Number;
  createdAt?: Date;
  updatedAt?: Date;
  owner: IUser
}

export interface IActionModel extends Model<IAction> {}
