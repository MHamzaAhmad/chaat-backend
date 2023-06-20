import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
  },
  { timestamps: true }
);

const Group = mongoose.model("group", groupSchema);
export default Group;
