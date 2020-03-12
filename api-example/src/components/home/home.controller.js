var Book = require('../books/book.entity');
var Author = require('../authors/author.entity');
var Genre = require('../genres/genre.entity');
var BookInstance = require('../bookinstances/bookinstance.entity');

var async = require('async');
var views = require('../../constants/views')

exports.index = function(req, res) {

    async.parallel({
      book_count: function(callback) {
          Book.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      book_instance_count: function(callback) {
          BookInstance.countDocuments({}, callback);
      },
      book_instance_available_count: function(callback) {
          BookInstance.countDocuments({status:'Available'}, callback);
      },
      author_count: function(callback) {
          Author.countDocuments({}, callback);
      },
      genre_count: function(callback) {
          Genre.countDocuments({}, callback);
      }
    }, function(err, results) {
        res.render(views.home, { title: 'Local Library Home', error: err, data: results });
    });
};