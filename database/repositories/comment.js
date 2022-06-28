import db from "../index.js";
const comments = () => db("comments");

async function createComment(user_id, content) {
  return await comments().insert({ user_id, content }, ["id"]);
}

async function fetchComments() {
  return await comments().join("users", "comments.user_id", "=", "users.id");
}

export default { createComment, fetchComments };
