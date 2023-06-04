import express from "express";
import morgan from "morgan";
import { init } from "./io.js";
import { createServer } from "http";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const server = createServer(app);
init(server);

export default server;
