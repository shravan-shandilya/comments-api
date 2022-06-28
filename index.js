import express from "express";
import helmet from "helmet";
import cors from "cors";
import { handleError } from "./errors.js";
import { logger } from "./utils/logger.js";
import { router } from "./router/index.js";
import { APP } from "./config.js";

const port = APP.PORT;
const MODULE = "(index.js)";

(async () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());

  // cors
  app.options("*", cors());
  app.use(cors());

  // attach router
  app.use(router);

  // not found handler
  app.all("*", (req, res) => {
    res.status(404).send({ success: false });
    logger.warn(
      `served a 404 to request: ${req.url}, ip: ${
        req.ip || req.headers["x-forwarded-for"]
      }`
    );
  });

  // error handler
  app.use(handleError);

  app.listen(port, () => {
    logger.info(`${MODULE} Ghost API listening at http://localhost:${port}`);
  });
})();
