import { model } from "mongoose";
import { IUser } from "../interface/user.interface";
import userSchema from "../model/user.model";
import { PostUser } from "../../../type/user.type";

export async function findUserByEmail(email: string) {
  const User = model<IUser>('User', userSchema);
  const query = User.where({email});

  return query.findOne();
}

export async function findUserById(userId: string) {
  const User = model<IUser>('User', userSchema);
  return User.findOne({
    _id: userId
  });
}

export async function postUser(postedData: PostUser) {
  const User = model<IUser>('User', userSchema);

  return new User({
    id: String(Math.floor(Math.random() * 42)),
    email: postedData.email,
    credits: {},
    queue: [],
  });
}
