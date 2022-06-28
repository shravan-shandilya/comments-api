import { logger } from "./utils/logger.js";
const MODULE = "(errors.js)";

function handleError(err, req, res, next) {
  logger.error(`${MODULE} encountered server error`);
  logger.error(err);
  return res.status(500).json({ success: false });
}

export { handleError };
