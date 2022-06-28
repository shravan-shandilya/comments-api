import { logger } from "./utils/logger.js";
import { createResponse } from "./controllers/response.js";
const MODULE = "(errors.js)";

class GhostError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
const UserNotFoundError = new GhostError("user not found", 404);

function handleError(err, req, res, next) {
  logger.error(`${MODULE} encountered an error while serving ${req.path}`);
  return err instanceof GhostError
    ? res
        .status(err.status)
        .json(createResponse(false, null, { message: err.message }))
    : res.status(500).json(
        createResponse(false, null, {
          message: "server encountered an error",
        })
      );
}

export { handleError, UserNotFoundError };
