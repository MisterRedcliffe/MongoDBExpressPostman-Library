var express = require('express');
var router = express.Router();

let { Book } = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {

    let book_query = Book.find({});
    book_query.sort({ title: 1 });
    let find_promise = book_query.exec();
    find_promise
        .then((Book) => {
            res.json(Book);
        })
        .catch((err) => {
            res.status(400).json(error);
        });
});

router.post('/', function(req, res, next) {
    const new_book = new Book(req.body);
    let save_promise = new_book.save();
    save_promise
        .then((save_book) => {
            res.json(save_book);
        })
        .catch((err) => {
            res.status(500).json(error);
        });
});

module.exports = router;