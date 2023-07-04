import express from "express";
import morgan from "morgan";
import router from "./router.js";
import errorHandler from "./middlewares/errorHandler.js";
import _initializePassport from "./passport/passport.js";
import connectDB from "./config/connection.js";
import { init } from "./services/socketService.js";
import { createServer } from "http";
import cors from "cors";

const app = express();
const server = createServer(app);
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

await connectDB();

init(server);

app.use("/api", router);

app.use(errorHandler);

export default server;
