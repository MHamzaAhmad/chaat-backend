import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      required: true,
    },
    content: {
      type: String,
    },
  },
  { timestamps: true }
);

const Message = new mongoose.model("message", messageSchema);
export default Message;
