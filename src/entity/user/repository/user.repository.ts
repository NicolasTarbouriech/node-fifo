import { PostUser } from "../type/user.type";
import User from "../model/user.model";
import { IUser } from "../interface/user.interface";

export async function findUserByEmail(email: string): Promise<IUser> {
  return User.findOne({
    email,
  });
}

export async function findUserById(userId: string): Promise<IUser> {
  return User.findOne({
    _id: userId,
  });
}

export async function postUser(postedData: PostUser) {
  return new User({
    email: postedData.email,
    credits: {},
    queue: [],
  });
}

export async function retrieveUserWithQueues(): Promise<IUser[]> {
  return User.find().populate("queue");
}

export async function findAndUpdateUser(user: IUser): Promise<IUser> {
  return User.findOneAndUpdate(
    {
      _id: user._id,
    },
    {
      $set: {
        credits: user.credits,
        queue: user.queue,
        lastActionDeletedAt: user.lastActionDeletedAt,
      },
    }
  );
}
