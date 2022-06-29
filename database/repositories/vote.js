import db from "../index.js";
import { logger } from "../../utils/logger.js";
const MODULE = "(repositories/vote.js)";

async function getVote(user_id, comment_id) {
  try {
    return await db("votes").where({ user_id, comment_id }).first();
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    throw err;
  }
}

async function postVote(user_id, comment_id, type) {
  try {
    let result = await db("votes")
      .insert({ user_id, comment_id, type })
      .onConflict(["user_id", "comment_id"])
      .merge(["type", "updated_at"])
      .returning(["id"]);

    return result[0]["id"];
  } catch (err) {
    logger.error(`${MODULE} database query failed with error ${err.message}`);
    throw err;
  }
}

export default { getVote, postVote };
