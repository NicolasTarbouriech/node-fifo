import { model } from "mongoose";
import { IAction } from "../interface/action.interface";
import actionSchema from "../model/action.model";
import { IUser } from "../../user/interface/user.interface";
import { TypeAction } from "../../../type/action.type";

export async function addActionToUser(type: string, user: IUser) {
  const Action = model<IAction>('Actions', actionSchema);

  const action = new Action({
    type: type as TypeAction,
    credits: 0,
    owner: user
  });

  await action.save();

  user.queue.push(action.id);
  await user.save();

  return action;
}
