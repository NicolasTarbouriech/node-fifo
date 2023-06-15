import { HttpInternalServerError, HttpNotFoundError } from "../utils/httpError.util";
import { AuthToken, SignInRequest } from "../entity/user/type/user.type";
import { signIn } from "../service/auth.service";
import { findUserByEmail } from "../entity/user/repository/user.repository";

export class AuthController {
  static signIn(body: SignInRequest): Promise<AuthToken> {
    return signIn(body.email)
      .then(async (accessToken) => {
        const user = await findUserByEmail(body.email);

        if (!user) {
          throw HttpNotFoundError('User not found in base');
        }

        return {
          accessToken,
        };
      })
      .catch((e: Error) => {
        throw HttpInternalServerError(e.message ?? 'Internal server error');
      });
  }
}
