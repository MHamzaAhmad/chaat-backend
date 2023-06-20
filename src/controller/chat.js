import io from "../services/socketService";

const chatServer = () => {
  io.on("connection", () => {});
};

const messageHandler = (data) => {
  const { content, to } = data;
};

export default chatServer;
