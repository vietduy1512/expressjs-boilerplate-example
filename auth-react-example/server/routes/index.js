const indexRouter = require('../src/components/home/index.route');
const authRouter = require('../src/components/auth/auth.route');

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/', authRouter);
}