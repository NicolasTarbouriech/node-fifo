import { model } from "mongoose";
import { ActionTypes, IAction } from "../interface/action.interface";
import actionSchema from "../model/action.model";
import { IUser } from "../../user/interface/user.interface";
import userSchema from "../../user/model/user.model";
import { HttpNotFoundError } from "../../../utils/httpError.util";

export async function addActionToUser(type: string, userId: string) {
  const Action = model<IAction>("Actions", actionSchema);
  const User = model<IUser>("User", userSchema);

  const user = await User.findById(userId);

  if (!user) {
    throw HttpNotFoundError("user not found in base");
  }

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
  return Action.find({ owner: userId });
}
