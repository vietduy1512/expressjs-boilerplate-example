const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../components/users/user.schema');

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findOne({where: { id: id }})
    .then((user,t1, t2) => {
      done(null, user)
    })
    .catch(err => {
      console.log(err)
    })
});

passport.use(LocalStrategy)

module.exports = passport