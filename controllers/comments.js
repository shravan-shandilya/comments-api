import { commentsRepository } from "../database/repositories/index.js";
import { CommentNotFoundError } from "../errors.js";
import { createResponse } from "./response.js";

async function getComment(req, res, next) {
  try {
    let commentId = req.params.id;
    let comment = await commentsRepository.getComment(commentId);

    return comment
      ? res.send(createResponse(true, { comment }, null))
      : next(CommentNotFoundError);
  } catch (err) {
    return next(err);
  }
}

async function getComments(req, res, next) {
  try {
    let comments = await commentsRepository.fetchComments();
    return res.send(createResponse(true, { comments }, null));
  } catch (err) {
    return next(err);
  }
}

async function postComment(req, res, next) {
  try {
    const { user_id, content, parent } = req.body;

    let id = await commentsRepository.createComment(user_id, content, parent);
    return res.send(createResponse(true, { id }, null));
  } catch (err) {
    return next(err);
  }
}

export { getComment, getComments, postComment };
