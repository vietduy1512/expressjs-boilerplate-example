var createError = require('http-errors');
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

var exphbs = require('express-handlebars');
var handlebars  = require('./src/helpers/handlebars')(exphbs);
app.engine('handlebars', handlebars.engine);

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'handlebars');

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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
