import validator from "express-validator";
import { GhostError } from "../errors.js";

const validationErrorHandler = (req, res, next) => {
  const { errors } = validator.validationResult(req);
  if (errors.length > 0) {
    return next(
      new GhostError(`field '${errors[0].param}' is missing or invalid`, 400)
    );
  }
  return next();
};

const validatePostComment = [
  validator.body("user_id").isInt({ min: 1 }),
  validator.body("content").isLength({ min: 1, max: 1000 }).trim().escape(),
  validator.body("parent").isInt({ min: -1, max: -1 }),
  validationErrorHandler,
];

export { validatePostComment };
