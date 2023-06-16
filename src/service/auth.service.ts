import jwt from "jsonwebtoken";
import { IUser } from "../entity/user/interface/user.interface";
import { model } from "mongoose";
import userSchema from "../entity/user/model/user.model";
import { jwtSecret } from "../config";

export async function signIn(email: string): Promise<string> {
  const User = model<IUser>("User", userSchema);
  const user = await User.findOne({
    email: email,
  });

  return new Promise<string>((resolve, reject) => {
    try {
      resolve(jwtSign(user));
    } catch (e) {
      reject(e);
    }
  });
}

function jwtSign(user: any) {
  return jwt.sign(
    {
      user,
    },
    jwtSecret as string,
    {
      expiresIn: 86400, // 24 hours
    }
  );
}
