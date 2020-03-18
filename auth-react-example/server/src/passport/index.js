const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const User = require('../components/users/user.schema');

passport.serializeUser((user, done) => {
  done(null, { _id: user._id })
})

passport.deserializeUser((id, done) => {
  User.findOne(
    { _id: id },
    (err, user) => {
      done(null, user)
    }
  )
})

passport.use(LocalStrategy)

module.exports = passport