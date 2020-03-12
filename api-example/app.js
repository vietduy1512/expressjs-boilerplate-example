var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var constants = require('./app-constants');

var homeRouter = require('./src/components/home/home.route');
var authorsRouter = require('./src/components/authors/authors.route');
var booksRouter = require('./src/components/books/books.route');
var bookinstancesRouter = require('./src/components/bookinstances/bookinstances.route');
var genresRouter = require('./src/components/genres/genres.route');

var app = express();

mongoose.connect(constants.mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/bookinstances', bookinstancesRouter);
app.use('/genres', genresRouter);


// 404 Handler
app.use(function(req, res, next) {
  res.status(404);
  res.json({
    error: 'Request not found: ' + req.url
  });
});

// Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message
  });
});

module.exports = app;
