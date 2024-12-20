const express = require("express");
const router = express.Router();
const { Notes } = require("../models/notes");

router.get("/:notesId", async (req, res) => {
  const { notesId } = req.params;
  console.log(notesId);
  try {
    const note = await Notes.findById(notesId); // Use findById for a single document
    if (!note) {
      return res.status(404).json({ msg: "Note not found!" }); // Handle case where note is not found
    }
    res.status(200).json({ note });
  } catch (e) {
    res.status(500).json({ msg: "Server is down, try again!" });
  }
});

// Get all notes

router.get("/", async (req, res) => {
  try {
    const notes = await Notes.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new note
router.post("/", async (req, res) => {
  const { title } = req.body;
  const note = new Notes({
    title,
  });

  try {
    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
