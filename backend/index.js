const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const notesRouter = require("./routes/notesRouter");
const chatRouter = require("./routes/chatRouter");
const app = express();

// Middleware
cors({ origin: "https://your-frontend-domain.vercel.app" });
app.use(express.json());

// Environment Variables
dotenv.config();
const port = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Routes
app.use("/api/notes", notesRouter);
app.use("/api/chats", chatRouter);

// Root Route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Error Handling Middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
