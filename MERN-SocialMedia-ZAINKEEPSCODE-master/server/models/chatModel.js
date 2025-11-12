import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const ChatModel = mongoose.model("Chat", ChatSchema);
export default ChatModel;

// 6486bb49914ea78fa598a4ef
// 6486c4e7445f29a3031bee52