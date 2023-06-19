import { calculateCredits } from "../utils/credits.utils";
import {
  actionTypeValuesMap,
  IAction,
} from "../entity/action/interface/action.interface";
import {
  findAndUpdateUser,
  retrieveUserWithQueues,
} from "../entity/user/repository/user.repository";
import { findActionByIdAndDelete } from "../entity/action/repository/action.repository";
import { Server } from "socket.io";

export async function deleteActionUsers(io: Server) {
  const users = await retrieveUserWithQueues();

  for (const user of users) {
    const currentTime = Date.now();
    const lastActionDeletedTime = user.lastActionDeletedAt?.getTime() || 0;
    const elapsedTime = currentTime - lastActionDeletedTime;

    if (elapsedTime >= 24 * 60 * 60 * 1000) {
      for (const [type, value] of Object.entries(actionTypeValuesMap)) {
        user.credits[type] = calculateCredits(value);
        await findAndUpdateUser(user);
      }
    }

    if (user.queue.length > 0 && user.credits[user.queue[0].type] > 0) {
      const action: IAction = user.queue.shift()!;
      await findActionByIdAndDelete(action._id);

      user.credits[action.type]--;
      user.lastActionDeletedAt = new Date();
      await findAndUpdateUser(user);

      io.emit("actionDeleted");
      console.log("action successfully deleted !");
    }
  }
}
