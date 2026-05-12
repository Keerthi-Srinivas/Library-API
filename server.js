const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ ROOT
app.get("/", (req, res) => {
  res.send("📚 Library API is running...");
});

// ✅ ADD ROUTE (IMPORTANT)
app.get("/add", async (req, res) => {
  const Book = require("./models/Book");

  const book = new Book({
    title: "Atomic Habits",
    author: "James Clear",
    publishedYear: 2018,
    genre: "Self-help"
  });

  await book.save();

  console.log("Book added"); // debug
  res.send("Book Added ✅");
});

// ✅ API ROUTES
app.use("/api/books", require("./routes/bookRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});