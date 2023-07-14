import express from "express";
import { jwtAuth } from "../passport/strategies/jwtStrategy.js";
import { getMessages, getUserChats } from "../controller/chat.js";

const chatRouter = express.Router();

chatRouter.route("/").get(jwtAuth, getUserChats);
chatRouter.route("/messages").get(jwtAuth, getMessages);

export default chatRouter;
