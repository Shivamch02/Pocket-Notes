const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const notesRouter = require("./routes/notesRouter");
const chatRouter = require("./routes/chatRouter");
const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();
const port = 3000;

mongoose.connect(process.env.MONGO_URL);

app.use("/api/notes", notesRouter);
app.use("/api/chats", chatRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
