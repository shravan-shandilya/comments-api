import { getComment, getComments, postComment } from "./comments.js";
import { getPing } from "./ping.js";
import { postVote } from "./vote.js";

export default {
  pingController: { getPing },
  commentsController: { getComment, getComments, postComment },
  votesController: { postVote },
};
