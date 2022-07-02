import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: String,
  },
  { timestamps: true }
);

export default mongoose.model("Message", MessageSchema);
