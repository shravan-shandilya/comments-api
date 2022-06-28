import { getComments, postComment } from "./comments.js";
import { getPing } from "./ping.js";

export default {
  pingController: { getPing },
  commentsController: { getComments, postComment },
};
