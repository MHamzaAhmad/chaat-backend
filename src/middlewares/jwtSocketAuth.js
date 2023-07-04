import jwt from "jsonwebtoken";
const authenticateSocket = (socket, next) => {
  try {
    const token = socket.handshake.headers["authorization"].split(" ")[1] || "";
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
      if (err) {
        return next(err);
      }
      socket.user = user;
      next();
    });
  } catch (error) {
    return next(error);
  }
};

export default authenticateSocket;
