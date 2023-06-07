import { IAction } from "../interface/action.interface";
import { model } from "mongoose";
import { IUser } from "../interface/user.interface";
import userSchema from "../model/user.model";
import actionSchema from "../model/action.model";
import { CronJob } from 'cron';

const job = new CronJob('*/2 * * * * ', async () => {
  try {
    const User = model<IUser>('User', userSchema);
    const Action = model<IAction>('Actions', actionSchema);

    const users = await User.find().populate('queue');

    for (const user of users) {
      if (user.queue.length > 0 && user.credits[user.queue[0].type] > 0) {
        const action: IAction = user.queue.shift()!;
        await Action.findByIdAndDelete(action._id);
        user.credits[action.type]--;
        await User.findOneAndUpdate(
          {
            _id: user._id
          },
          {
            $set:
              {
                credits: user.credits,
                queue: user.queue,
                lastUpdatedAt: new Date()
              }
          });
      }
    }
  } catch (error) {
    console.error('Error executing cron job:', error);
  }
});

export default job;
