const mongoose = require("mongoose");

// Create schema
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publishedYear: {
    type: Number
  },
  genre: {
    type: String
  }
});

// Export model (VERY IMPORTANT)
module.exports = mongoose.model("Book", bookSchema);