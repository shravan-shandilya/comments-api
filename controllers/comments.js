import { commentsRepository } from "../database/repositories/index.js";
import { createResponse } from "./response.js";

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
    const user_id = req.body.user_id;
    const content = req.body.content;
    let id = await commentsRepository.createComment(user_id, content);
    return res.send(createResponse(true, { id: id[0]["id"] }, null));
  } catch (err) {
    return next(err);
  }
}

export { getComments, postComment };
