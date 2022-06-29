import { v4 as uuidv4 } from "uuid";
import { logger } from "../utils/logger.js";
let clients = [];
let event = { type: null, data: null };
const MODULE = "(events/index.js)";

function subscribe(req, res) {
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.flushHeaders();

  const data = `data: ${JSON.stringify(event)}\n\n`;

  res.write(data);

  const client = {
    id: uuidv4(),
    res,
  };

  clients.push(client);

  req.on("close", () => {
    clients = clients.filter((c) => c.id !== client.id);
  });
}

function broadcast(type, data) {
  event = { type, data };

  if (clients.length > 0)
    logger.info(
      `${MODULE} broadcasted new events to ${clients.length} clients`
    );
  clients.forEach((client) => {
    client.res.write(`data: ${JSON.stringify(event)}\n\n`);
  });
}

export default { subscribe, broadcast };
