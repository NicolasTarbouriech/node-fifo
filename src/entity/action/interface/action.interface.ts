import { Document } from "mongodb";
import { Model } from "mongoose";
import { IUser } from "../../user/interface/user.interface";

export enum ActionTypeEnum {
  A = "A",
  B = "B",
  C = "C",
}

export const actionTypeEnum = Object.values(ActionTypeEnum);
export type ActionTypes = (typeof actionTypeEnum)[number];

export const actionTypeValuesMap: Record<ActionTypeEnum, number> = {
  [ActionTypeEnum.A]: 20,
  [ActionTypeEnum.B]: 20,
  [ActionTypeEnum.C]: 30,
};

export interface IAction extends Document {
  type: ActionTypes;
  credits: Number;
  createdAt?: Date;
  updatedAt?: Date;
  owner: IUser;
}

export interface IActionModel extends Model<IAction> {}
