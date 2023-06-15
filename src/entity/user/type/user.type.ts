export type PostUser = {
  email: string;
};

export interface SignInRequest {
  email: string;
}

export interface AuthToken {
  /**
   * Jwt access token generated and used to log in
   */
  accessToken: string;
}
