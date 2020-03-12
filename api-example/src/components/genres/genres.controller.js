var Genre = require('./genre.entity');
var Book = require('../books/book.entity');
var async = require('async');
const validator = require('express-validator');

exports.genre_list = function(req, res, next) {
    
    Genre.find()
      .exec(function (err, list_genres) {
          if (err) {
              return next(err);
          }
          res.json({ title: 'Genre List', genre_list: list_genres });
      })
};

exports.genre_detail = function(req, res, next) {

    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
              .exec(callback);
        },
        genre_books: function(callback) {
            Book.find({ 'genre': req.params.id })
              .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.genre == null) {
            var err = new Error('Genre not existed');
            err.status = 404;
            return next(err);
        }
        res.json({ title: 'Genre Detail', genre: results.genre, genre_books: results.genre_books });
    });
};

exports.genre_create_post = exports.genre_create_post =  [
   
    validator.body('name', 'Genre name required').isLength({ min: 1 }).trim(),
    validator.sanitizeBody('name').escape(),
    (req, res, next) => {

      // Create a genre object with escaped and trimmed data.
      var genre = new Genre(
        { name: req.body.name }
      );

      const errors = validator.validationResult(req);
      if (!errors.isEmpty()) {
        // There are errors. Render the form again with sanitized values/error messages.
        res.json({ title: 'Create Genre', genre: genre, errors: errors.array()});
        return;
      } else {
        Genre.findOne({ 'name': req.body.name })
          .exec(function(err, existed_genre) {
            if (err) { return next(err); }

            if (existed_genre) {
              res.redirect(existed_genre.url);
            }
            else {
              genre.save(function (err) {
                if (err) { return next(err); }
                res.redirect(genre.url);
              });
            }
          });
      }
    }
  ];