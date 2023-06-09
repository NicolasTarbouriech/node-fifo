import { CronJob } from "cron";
import { model } from "mongoose";
import { IUser } from "../entity/user/interface/user.interface";
import actionSchema from "../entity/action/model/action.model";
import { IAction } from "../entity/action/interface/action.interface";
import userSchema from "../entity/user/model/user.model";

const job = new CronJob("*/1 * * * * ", async () => {
  try {
    const User = model<IUser>("User", userSchema);
    const Action = model<IAction>("Actions", actionSchema);

    const users = await User.find().populate("queue");

    for (const user of users) {
      if (user.queue.length > 0 && user.credits[user.queue[0].type] > 0) {
        const action: IAction = user.queue.shift()!;
        await Action.findByIdAndDelete(action._id);
        user.credits[action.type]--;
        await User.findOneAndUpdate(
          {
            _id: user._id,
          },
          {
            $set: {
              credits: user.credits,
              queue: user.queue,
            },
          }
        );
      }
    }
  } catch (error) {
    console.error("Error executing cron job:", error);
  }
});

export default job;
