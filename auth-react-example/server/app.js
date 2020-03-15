const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const passport = require('./src/passport');
const routes = require('./routes');
const dbConnection = require('./src/mongoose');
const MongoStore = require('connect-mongo')(session);

const app = express();

const PORT = 8080;

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "SeRectKeY@123",
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

routes(app);

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})
