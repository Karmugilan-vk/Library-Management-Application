const Book = require("../models/book");
const jwt = require("jsonwebtoken");

const createBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const { search, sort } = req.query;
    let filter = {};

    if (search) {
      filter = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } }
        ]
      };
    }

    let books = Book.find(filter);
    if (sort) books = books.sort(sort);

    const result = await books;
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookByTitle = async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooksByLimit = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3; 
    const offset = parseInt(req.query.offset) || 0;

    const books = await Book.find().skip(offset).limit(limit);
    const totalBooks = await Book.countDocuments();

    res.json({totalBooks,limit, offset, books});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req,res) => {
  const {author, id} = req.body;
  if(!author || !id){
    res.status(404).json({message: "Fields to be add"});
  }

  const book = await Book.find({
    author: author,
    id: id
  })
  console.log(book);
  if(!book){
    res.status(404).json({massage : "Author not found"});
  }
  res.status(200).json({
    message: "Successfully Login",
    token: jwt.sign({author, id}, process.env.JWT_SECRET,{
      expiresIn: "3000",
    }),
  });
}

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {createBook,getBooks,getBookById, getBookByTitle, getBooksByLimit,login,updateBook,deleteBook,}; 