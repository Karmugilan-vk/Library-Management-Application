const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

const getBooks = asyncHandler(async (req, res) => {
  const { search, sort } = req.query;
  let filter = {};

  if (search) {
    filter = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ],
    };
  }

    let books = Book.find(filter);
  if (sort) books = books.sort(sort);

  const result = await books;
  res.json(result);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});

const getBookByTitle = asyncHandler(async (req, res) => {
  const book = await Book.findOne({ title: req.params.title });
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json(book);
});


const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }
  res.json({ message: "Book deleted successfully" });
});

module.exports = {createBook,getBooks,getBookById, getBookByTitle,updateBook,deleteBook,}; 