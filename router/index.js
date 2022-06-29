import express from "express";
const { Router } = express;
const router = Router();
import { validatePostComment } from "../utils/validator.js";

import controllers from "../controllers/index.js";

router.get("/ping", controllers.pingController.getPing);
router.get("/comments", controllers.commentsController.getComments);
router.post(
  "/comments",
  validatePostComment,
  controllers.commentsController.postComment
);

export { router };
