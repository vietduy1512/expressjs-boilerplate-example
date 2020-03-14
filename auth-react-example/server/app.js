const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const constants = require('./app.constants');
const session = require('express-session');
const passport = require('./src/passport');

const PORT = 8080;

const indexRouter = require('./src/components/home/index.route');
const authRouter = require('./src/components/auth/auth.route');

const app = express();

mongoose.set('useCreateIndex', true);
mongoose.connect(constants.mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
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
