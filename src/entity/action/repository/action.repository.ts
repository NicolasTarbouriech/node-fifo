import { ActionTypes, IAction } from "../interface/action.interface";
import { HttpNotFoundError } from "../../../utils/httpError.util";
import Action from "../model/action.model";
import User from "../../user/model/user.model";

export async function addActionToUser(type: string, userId: string) {
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
  return Action.findByIdAndDelete(action._id);
}

export async function findActionsByUserId(userId: string) {
  return Action.find({ owner: userId });
}
