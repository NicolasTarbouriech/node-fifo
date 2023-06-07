import { model } from "mongoose";
import { IUser } from "../interface/user.interface";
import userSchema from "../model/user.model";

export async function findUserByEmail(email: string) {
  const User = model<IUser>('User', userSchema);
  const query = User.where({email});

  return query.findOne();
}
