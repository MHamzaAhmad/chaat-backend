import { Server } from "socket.io";
let io;

const init = async (server) => {
  io = new Server(server);
  return io;
};

const socket = () => {
  if (!io) throw new Error("Socket is not initialized");
  return io;
};

export { init, socket };
