
var Author = require('../models/author');
var Book = require('../models/book');
var async = require('async');
var routes = require('../constants/routes')

exports.author_list = function(req, res, next) {

    Author.find()
      .sort([['family_name', 'ascending']])
      .exec(function (err, list_authors) {
        if (err) {
            return next(err);
        }
        res.render(routes.author_list, { title: 'Author List', author_list: list_authors });
      });
};

exports.author_detail = function(req, res, next) {

    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
            .exec(callback)
        },
        authors_books: function(callback) {
            Book.find({ 'author': req.params.id },'title summary')
            .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.author == null) {
            var err = new Error('Author not found');
            err.status = 404;
            return next(err);
        }
        res.render(routes.author_detail, { title: 'Author Detail', author: results.author, author_books: results.authors_books } );
    });

};

exports.author_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create GET');
};

exports.author_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author create POST');
};

exports.author_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete GET');
};

exports.author_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author delete POST');
};

exports.author_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update GET');
};

exports.author_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: Author update POST');
};