import db from "../index.js";
import { logger } from "../../utils/logger.js";
import { UserNotFoundError } from "../../errors.js";
const MODULE = "(repositories/comment.js)";

async function createComment(user_id, content, parent) {
  try {
    let comment_id = await db("comments").insert({ user_id, content, parent }, [
      "id",
    ]);
    return comment_id;
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    if (err.code === "23503") {
      throw UserNotFoundError;
    } else {
      throw err;
    }
  }
}

async function fetchComments() {
  try {
    let comments = await db("comments")
      .select(
        "comments.id",
        "content",
        db.raw(
          `json_build_object('id', "user_id", 'fname', "fname", 'sname', "sname",'display_picture',"display_picture") as "author"`
        ),
        "comments.created_at",
        "comments.updated_at"
      )
      .join("users", "comments.user_id", "=", "users.id")
      .orderBy("comments.created_at", "desc");

    return comments;
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    throw err;
  }
}

export default { createComment, fetchComments };
