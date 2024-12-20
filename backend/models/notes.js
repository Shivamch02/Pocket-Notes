const mongoose = require("mongoose");

const notesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  chatIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notes = mongoose.model("Notes", notesSchema);

const chatSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true,
  },
  notesId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Notes",
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = { Notes, Chat };
