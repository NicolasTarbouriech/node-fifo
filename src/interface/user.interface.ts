import { Document } from "mongodb";
import { IAction } from "./action.interface";

export interface IUser extends Document {
  id: string;
  email: string;
  credits: {
    [key: string]: number;
  };
  lastUpdatedAt: Date;
  queue: IAction[];
}
