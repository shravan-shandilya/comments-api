import express from "express";
const { Router } = express;
const router = Router();

import controllers from "../controllers/index.js";

router.get("/ping", controllers.pingController.getPing);
router.get("/comments", controllers.commentsController.getComments);
router.post("/comments", controllers.commentsController.postComment);

export { router };
