import db from "../index.js";
const comments = () => db("comments");

async function createComment(user_id, content) {
  return await db("comments").insert({ user_id, content }, ["id"]);
}

async function fetchComments() {
  return await db("comments")
    .select(
      "comments.id",
      "content",
      "comments.created_at",
      "comments.updated_at",
      db.raw(
        `json_build_object('id', "user_id", 'fname', "fname", 'sname', "sname", 'display_picture', "display_picture") as "author"`
      )
    )
    .join("users", "comments.user_id", "=", "users.id");
}

export default { createComment, fetchComments };
