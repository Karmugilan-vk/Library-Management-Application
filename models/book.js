const mongoose = require("mongoose");
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
    }, 
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
    },
    publishedYear: {
        type: Number,
    },
}, {timestamps: true});


const Book = mongoose.model("Book",bookSchema);
module.exports = Book;

