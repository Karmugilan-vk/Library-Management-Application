const express = require("express");
const router = express.Router();

const {  createBook,  getBooks, getBookById,  getBookByTitle, updateBook,  deleteBook,} = require("../controllers/bookController");

const validationToken = require("../middleware/validateToken");

router.use(validationToken);

router.post("/", createBook);
router.get("/:id", getBookById);
router.get("/", getBooks);
router.get("/title/:title", getBookByTitle);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
