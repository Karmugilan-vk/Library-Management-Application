const express = require("express");
const router = express.Router();
const Book = require("../models/book");
const {login} = require("../controllers/bookController");

router.route("/").post(login);

module.exports = router;