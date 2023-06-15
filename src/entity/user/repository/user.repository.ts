import { model } from "mongoose";
import { IUser } from "../interface/user.interface";
import userSchema from "../model/user.model";
import { PostUser } from "../type/user.type";

export async function findUserByEmail(email: string) {
  const User = model<IUser>("User", userSchema);
  const query = User.where({ email });

  return query.findOne();
}

export async function findUserById(userId: string) {
  const User = model<IUser>("User", userSchema);
  return User.findOne({
    _id: userId,
  });
}

export async function postUser(postedData: PostUser) {
  const User = model<IUser>("User", userSchema);

  return new User({
    email: postedData.email,
    credits: {},
    queue: [],
  });
}

export async function retrieveUserWithQueues() {
  const User = model<IUser>("User", userSchema);

  return User.find().populate("queue");
}

export async function findAndUpdateUser(user: any) {
  const User = model<IUser>("User", userSchema);
  
  return User.findOneAndUpdate(
    {
      _id: user._id,
    },
    {
      $set: {
        credits: user.credits,
        queue: user.queue,
        lastActionDeletedAt: user.lastActionDeletedAt
      },
    }
  );
}
