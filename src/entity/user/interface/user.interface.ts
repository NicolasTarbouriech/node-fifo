import { Document } from "mongodb";
import { IAction } from "../../action/interface/action.interface";

export interface IUser extends Document {
  id: string;
  email: string;
  credits: {
    [key: string]: number;
  };
  queue: IAction[];
  createdAt?: Date;
  updatedAt?: Date;
}
