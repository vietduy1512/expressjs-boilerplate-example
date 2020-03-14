var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var mongoose = require('mongoose');
var constants = require('./app.constants');
const session = require('express-session');
const passport = require('./src/passport');

const PORT = 8080;

var indexRouter = require('./src/components/home/index.route');
var authRouter = require('./src/components/auth/auth.route');

var app = express();

mongoose.connect(constants.mongoUrl, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "SeRectKeY@123",
  saveUninitialized: true,
  resave: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', indexRouter);
app.use('/', authRouter);

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
