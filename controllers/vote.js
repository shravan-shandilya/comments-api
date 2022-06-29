import comment from "../database/repositories/comment.js";
import {
  commentsRepository,
  votesRepository,
} from "../database/repositories/index.js";
import { createResponse } from "./response.js";

async function postVote(req, res, next) {
  try {
    const { user_id, comment_id, type } = req.body;

    let oldVote = await votesRepository.getVote(user_id, comment_id);
    if (oldVote && type === oldVote.type)
      return res.send(createResponse(true, { id: oldVote.id }, null));

    let voteId = await votesRepository.postVote(user_id, comment_id, type);

    let diff = { upvote: 0, downvote: 0 };

    diff["upvote"] = type === "upvote" ? 1 : 0;
    diff["downvote"] = type === "downvote" ? 1 : 0;

    if (oldVote) {
      diff[oldVote.type]--;
    }

    await commentsRepository.updateVotes(
      comment_id,
      diff["upvote"],
      diff["downvote"]
    );

    return res.send(createResponse(true, { id: voteId }, null));
  } catch (err) {
    return next(err);
  }
}

export { postVote };
