import winston from "winston";
const { createLogger, format, transports } = winston;

const logger = createLogger({
  format: format.combine(
    format.timestamp({
      format: () => {
        return new Date().toLocaleString("en-US", {
          timeZone: "Asia/Kolkata",
        });
      },
    }),
    format.printf((...args) => {
      let arg = args[0];
      return `${arg.timestamp} [${arg.level.toUpperCase()}]: ${arg.message} ${
        arg.payload !== undefined ? JSON.stringify(arg.payload) : ""
      }`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export { logger };
