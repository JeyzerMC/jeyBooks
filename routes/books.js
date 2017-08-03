/********************************************************
 * Name: books.js
 * Description: Setup for the books page
 * Author: JeyzerMC
 * Date:   July 31th, 2017
 ********************************************************/

var router = require("express").Router({
        mergeParams: true
    }),
    Books = require("../models/bookModel");


router.get("/", function (req, res) {
    Books.find({}, function (err, bookData) {
        res.render("../views/books/books", {
            books: bookData
        });
    });
});


module.exports = router;