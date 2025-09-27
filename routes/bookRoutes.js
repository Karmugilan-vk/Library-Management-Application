const express = require("express");
const {  createBook,  getBooks, getBookById,  getBookByTitle, getBooksByLimit,login, updateBook,  deleteBook,} = require("../controllers/bookController");

const router = express.Router();

router.post("/", createBook);
router.get("/:id", getBookById);
router.get("/", getBooks);
router.get("/title/:title", getBookByTitle);
router.get("/", getBooksByLimit);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
