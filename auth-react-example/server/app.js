var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

const PORT = 8080;

var indexRouter = require('./src/components/home/index.route');
var usersRouter = require('./src/components/users/users.route');

var app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', usersRouter);

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

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
