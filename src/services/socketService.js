import { Server } from "socket.io";
let io;

export const init = (server) => {
  io = new Server(server);
  return io;
};

export default io;
