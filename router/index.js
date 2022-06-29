import express from "express";
const router = express.Router();
import {
  validateGetComment,
  validatePostComment,
  validatePostVote,
} from "../utils/validator.js";

import controllers from "../controllers/index.js";

router.get("/ping", controllers.pingController.getPing);
router.get("/comments", controllers.commentsController.getComments);
router.get(
  "/comments/:id",
  validateGetComment,
  controllers.commentsController.getComment
);
router.post(
  "/comments",
  validatePostComment,
  controllers.commentsController.postComment
);
router.post("/votes", validatePostVote, controllers.votesController.postVote);

export { router };
