import { body } from "express-validator";
import { HttpError } from "../utils/httpError.util";

const validTypeValues = ["A", "B", "C"];

export const validateType = body("type").custom((value) => {
  if (!validTypeValues.includes(value) || value.length !== "1") {
    throw HttpError(400, 'Type must be "A", "B", or "C"');
  }
  return true;
});
