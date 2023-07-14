import message from "../models/message.js";
import Message from "../models/message.js";
import mongoose from "mongoose";
import _ from "lodash";

const chatServer = (io) => {
  io.on("connection", (socket) => {
    socket.on("message", async (msg) => {
      await messageHandler(socket, msg);
    });
  });
};

const messageHandler = async (socket, data) => {
  const { msg, to } = data;
  const from = socket.user.id;
  const message = await Message.create({
    sender: from,
    receiver: to,
    content: msg,
  });
  socket.to(to).emit("message", msg);
};

export const getUserChats = async (req, res, next) => {
  try {
    const { id } = req.user;
    const users = await message
      .aggregate([
        {
          $match: {
            sender: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "receiver",
            foreignField: "_id",
            as: "receiverInfo",
          },
        },
        {
          $unwind: {
            path: "$receiverInfo",
          },
        },
        {
          $project: {
            _id: 0,
            receiverInfo: 1,
          },
        },
        {
          $replaceRoot: {
            newRoot: "$receiverInfo",
          },
        },
        {
          $project: {
            password: 0,
          },
        },
        {
          $group: {
            _id: "$_id",
            pre: {
              $first: "$$ROOT",
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: "$pre",
          },
        },
      ])
      .exec();
    if (_.isEmpty(users))
      return res.status(404).send({ msg: "No users found" });

    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const { receiverId } = req.query;
    const messages = await message.find({
      $or: [
        { sender: req.user._id, receiver: receiverId },
        { sender: receiverId, receiver: req.user._id },
      ],
    });
    res.status(_.isEmpty(messages) ? 404 : 200).send(messages);
  } catch (error) {
    next(error);
  }
};

export default chatServer;
