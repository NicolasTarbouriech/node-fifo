import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";
import { findUserByEmail } from "../entity/user/repository/user.repository";
import { HttpNotFoundError } from "../utils/httpError.util";

export async function signIn(email: string): Promise<string> {
  const user = await findUserByEmail(email);

  if (!user) {
    throw HttpNotFoundError("User not found in base");
  }

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
