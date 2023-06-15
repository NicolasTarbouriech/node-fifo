import { HttpUnauthorizedError } from "../utils/httpError.util";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

function verify(headers: Request['headers']) {
  const { authorization } = headers;

  if (!authorization) {
    throw HttpUnauthorizedError('No header Authorization');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET_KEY as string
    ) as JwtPayload;
  } catch (e) {
    throw HttpUnauthorizedError('Invalid token');
  }
}

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = verify(req.headers);
    res.locals.user = data.user;
    next();
  } catch (e) {
    next(e);
  }
};
