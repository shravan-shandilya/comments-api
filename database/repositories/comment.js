import db from "../index.js";
import { logger } from "../../utils/logger.js";
import { UserNotFoundError } from "../../errors.js";
const MODULE = "(repositories/comment.js)";

async function createComment(user_id, content, parent) {
  try {
    let result = await db("comments")
      .insert({ user_id, content, parent })
      .returning(["id"]);

    return result[0]["id"];
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    throw err.code === "23503" ? UserNotFoundError : err;
  }
}

async function getComment(comment_id) {
  try {
    let author = db.raw(
      `json_build_object('id', "user_id", 'fname', "fname", 'sname', "sname", 'display_picture', "display_picture") as "author"`
    );

    let replies = db.raw(
      `(
          select json_agg(replies) from (
                 select
                    "comments"."id",
                    "comments"."content",
                    "comments"."created_at",
                    "comments"."updated_at",
                    "comments"."parent",
                    "comments"."upvotes",
                    "comments"."downvotes",
                    ?
                 from "comments"
                 left join "users" on "user_id" = "users"."id"
                 where parent = ?
             ) as replies
        ) as replies`,
      [author, comment_id]
    );

    let result = await db
      .select(
        "comments.id",
        "content",
        "comments.created_at",
        "comments.updated_at",
        "parent",
        "comments.upvotes",
        "comments.downvotes",
        author,
        replies
      )
      .from("comments")
      .leftJoin("users", "comments.user_id", "users.id")
      .where({ "comments.id": comment_id });
    return result ? result[0] : null;
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    throw err;
  }
}

async function fetchComments() {
  try {
    let author = db.raw(
      `json_build_object('id', "user_id", 'fname', "fname", 'sname', "sname", 'display_picture', "display_picture") as "author"`
    );

    let replies = db.raw(
      `(
          select json_agg(replies) from (
                 select
                    "comments"."id",
                    "comments"."content",
                    "comments"."created_at",
                    "comments"."updated_at",
                    "comments"."parent",
                    "comments"."upvotes",
                    "comments"."downvotes",
                    ?
                 from "comments"
                 left join "users" on "user_id" = "users"."id"
                 where parent = "root"."id"
                 order by "created_at" desc
             ) as replies
        ) as replies`,
      author
    );

    let comments = await db
      .select(
        "root.id",
        "root.content",
        "root.upvotes",
        "root.downvotes",
        "root.created_at",
        "root.updated_at",
        "root.parent",
        author,
        replies
      )
      .fromRaw(`"comments" root`)
      .leftJoin("users", "root.user_id", "=", "users.id")
      .where({ parent: -1 })
      .orderBy("created_at", "desc");
    return comments;
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    throw err;
  }
}

async function updateVotes(comment_id, upvotes, downvotes) {
  try {
    await db("comments")
      .update({
        upvotes: db.raw(`"upvotes" + (?)`, [upvotes]),
        downvotes: db.raw(`"downvotes" + (?)`, [downvotes]),
      })
      .where({ id: comment_id });
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    throw err;
  }
}

export default { createComment, getComment, fetchComments, updateVotes };
