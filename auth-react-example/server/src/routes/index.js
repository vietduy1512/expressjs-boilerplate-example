const indexRouter = require('../components/home/index.route');
const authRouter = require('../components/auth/auth.route');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/', authRouter);
}