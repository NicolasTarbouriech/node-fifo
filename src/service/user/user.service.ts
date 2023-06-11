import { findAndUpdateUser, retrieveUserWithQueues } from "../../entity/user/repository/user.repository";
import { IAction } from "../../entity/action/interface/action.interface";
import { findActionByIdAndDelete } from "../../entity/action/repository/action.repository";

export async function deleteActionUsers() {
  const users = await retrieveUserWithQueues();

  for (const user of users) {
    if (user.queue.length > 0 && user.credits[user.queue[0].type] > 0) {
      const action: IAction = user.queue.shift()!;
      await findActionByIdAndDelete(action._id);

      user.credits[action.type]--;
      await findAndUpdateUser(user);
    }
  }
}
