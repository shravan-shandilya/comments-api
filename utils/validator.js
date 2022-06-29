import validator from "express-validator";
import { GhostError } from "../errors.js";
import { commentsRepository } from "../database/repositories/index.js";

const validationErrorHandler = (req, res, next) => {
  const { errors } = validator.validationResult(req);
  if (errors.length > 0) {
    return next(
      new GhostError(`field '${errors[0].param}' is missing or invalid`, 400)
    );
  }
  return next();
};

const validateGetComment = [validator.param("id").exists().toInt({ min: 1 })];

const validatePostComment = [
  validator.body("user_id").isInt({ min: 1 }),
  validator.body("content").isLength({ min: 1, max: 1000 }).trim().escape(),
  validator
    .body("parent")
    .isInt({ min: -1 })
    .custom(async (parent) => {
      // allow if the comment is at the top level
      if (parent === -1) return true;

      // check if parent comment exists and its parent is -1
      let parentComment = await commentsRepository.getComment(parent);
      return parentComment != null && parentComment.parent == -1
        ? true
        : Promise.reject();
    }),
  validationErrorHandler,
];

const validatePostVote = [
  validator.body("user_id").isInt({ min: 1 }),
  validator
    .body("comment_id")
    .isInt({ min: 1 })
    .custom(async (comment_id) => {
      let comment = await commentsRepository.getComment(comment_id);
      return comment != null ? true : Promise.reject();
    }),
  validator.body("type").isString().isIn(["upvote", "downvote"]),
  validationErrorHandler,
];

export { validateGetComment, validatePostComment, validatePostVote };
