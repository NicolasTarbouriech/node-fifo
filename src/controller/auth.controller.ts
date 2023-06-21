import { HttpInternalServerError } from "../utils/httpError.util";
import {
  AuthToken,
  PostUser,
  SignInRequest,
} from "../entity/user/type/user.type";
import { signIn } from "../service/auth.service";
import {
  findUserByEmail,
  postUser,
} from "../entity/user/repository/user.repository";
import { Response } from "express";
import { actionTypeValuesMap } from "../entity/action/interface/action.interface";
import { calculateCredits } from "../utils/credits.utils";
import { IUser } from "../entity/user/interface/user.interface";

export class AuthController {
  static signIn(body: SignInRequest): Promise<AuthToken> {
    return signIn(body.email)
      .then(async (accessToken) => {
        return {
          accessToken,
        };
      })
      .catch((e: Error) => {
        throw HttpInternalServerError(e.message ?? "Internal server error");
      });
  }

  static async signUp(postedData: PostUser, res: Response) {
    try {
      const user: IUser = await postUser(postedData);

      for (const [type, value] of Object.entries(actionTypeValuesMap)) {
        user.credits[type] = calculateCredits(value);
      }

      const isUser = await findUserByEmail(postedData.email);

      if (isUser) {
        throw HttpInternalServerError("user already exists");
      }

      await user.save();

      return res.json(user);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
