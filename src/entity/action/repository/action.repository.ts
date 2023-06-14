import { model } from "mongoose";
import { ActionTypes, IAction } from "../interface/action.interface";
import actionSchema from "../model/action.model";
import { IUser } from "../../user/interface/user.interface";

export async function addActionToUser(type: string, user: IUser) {
  const Action = model<IAction>("Actions", actionSchema);

  const action = new Action({
    type: type as ActionTypes,
    credits: 0,
    owner: user,
  });

  await action.save();

  user.queue.push(action.id);
  await user.save();

  return action;
}

export async function findActionByIdAndDelete(action: IAction) {
  const Action = model<IAction>("Actions", actionSchema);

  return Action.findByIdAndDelete(action._id);
}

export async function findActionsByUserId(userId: string) {
  const Action = model<IAction>("Actions", actionSchema);
  return Action.find({owner: userId});
}
