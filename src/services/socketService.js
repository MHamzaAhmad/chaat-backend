import { Server } from "socket.io";
import chatServer from "../controller/chat.js";
import authenticateSocket from "../middlewares/jwtSocketAuth.js";

let io;

export const init = (server) => {
  io = new Server(server, {
    cors: "*",
  });
  io.use(authenticateSocket);
  chatServer(io);
  return io;
};

export default io;
