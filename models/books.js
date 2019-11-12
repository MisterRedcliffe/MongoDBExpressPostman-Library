const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book_Schema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
        unique: true
    },
    genre: {
        type: String,
        required: true
    },
    page_number: Number,
    recommend: {
        type: Boolean
    }
});

const Book = mongoose.model('books', book_Schema);
module.exports = Book;