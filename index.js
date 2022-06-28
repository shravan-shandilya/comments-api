import express from "express";
import helmet from "helmet";
import cors from "cors";
import { handleError } from "./errors.js";
import { logger } from "./utils/logger.js";

const port = 3000;
const MODULE = "(index.js)";

(async () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());

  // cors
  app.options("*", cors());
  app.use(cors());

  // dummy ping
  app.get("/ping", (req, res) => {
    logger.debug(`received a request ${req.path}`);
    res.send("pong!");
  });

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
