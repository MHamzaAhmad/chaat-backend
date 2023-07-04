const chatServer = (io) => {
  io.on("connection", (socket) => {
    socket.on("message", (msg) => {
      messageHandler(msg);
    });
  });
};

const messageHandler = (data) => {
  const { content, to } = data;
};

export default chatServer;
