const express = require("express");
const router = express.Router();
const { Chat, Notes } = require("../models/notes");

router.get("/:notesId", async (req, res) => {
  const { notesId } = req.params;
  console.log(notesId);
  try {
    const chats = await Chat.find({ notesId });
    res.status(200).json({
      chats,
    });
  } catch (e) {
    res.status(500).json({
      err: e.message,
    });
  }
});

router.post("/:notesId", async (req, res) => {
  const { content } = req.body;
  const { notesId } = req.params;
  console.log(notesId);

  const chat = await new Chat({
    content,
    notesId,
  });

  try {
    const newChat = await chat.save();
    res.status(200).json({ newChat });
  } catch (e) {
    res.status(500).json({ msg: e.message });
  }
});

module.exports = router;
