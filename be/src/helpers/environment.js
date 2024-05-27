import { env } from "./imports.js";

env.config();

const serverApiPort = process.env.SERVER_API_PORT;
const serverWebPort = process.env.SERVER_WEB_PORT;

export {
  serverApiPort,
  serverWebPort
}
