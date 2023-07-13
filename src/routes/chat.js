import express from "express";
import { jwtAuth } from "../passport/strategies/jwtStrategy.js";
import { getUserChats } from "../controller/chat.js";

const chatRouter = express.Router();

chatRouter.route("/").get(jwtAuth, getUserChats);

export default chatRouter;
