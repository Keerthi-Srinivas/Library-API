const Book = require("../models/Book");

// CREATE
exports.createBook = async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.json(book);
};

// READ ALL
exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

// READ ONE
exports.getBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.json(book);
};

// UPDATE
exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(book);
};

// DELETE
exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.json({ message: "Book deleted" });
};