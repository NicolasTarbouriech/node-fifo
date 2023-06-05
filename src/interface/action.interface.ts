import { Document } from "mongodb";
import { Model } from "mongoose";

export interface IAction extends Document {
  type: 'A' | 'B' | 'C';
  credits: Number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IActionModel extends Model<IAction> {}
