var Book = require('./book.entity');
var BookInstance = require('../bookinstances/bookinstance.entity');
var async = require('async');

exports.book_list = function(req, res, next) {

    Book.find({}, 'title author')
      .populate('author')
      .exec(function (err, list_books) {
        if (err) { 
            return next(err);
        }
        res.json({ title: 'Book List', book_list: list_books });
      });
};

exports.book_detail = function(req, res, next) {

    async.parallel({
        book: function(callback) {
            Book.findById(req.params.id)
              .populate('author')
              .populate('genre')
              .exec(callback);
        },
        book_instance: function(callback) {
          BookInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.book == null) {
            var err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }
        res.json({ title: results.book.title, book: results.book, book_instances: results.book_instance });
    });
};