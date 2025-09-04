const express = require("express");
const router = express.Router();
const Book = require("../models/book"); 

router.post("/", async (req, res) => {
  try {
    const book = await Book.create(req.body); 
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
