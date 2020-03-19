const User = require('../components/users/user.schema');
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
    usernameField: 'email',
    passwordField: 'password'
	},
	function(email, password, done) {
		User.findOne({where: { email: email }})
			.then(user => {
				if (!user) {
					return done(null, false, { message: 'Incorrect email' })
				}
				if (!user.password) {
					return done(null, false, { message: 'No password' });
				}
				if (!user.checkPassword(password)) {
					return done(null, false, { message: 'Incorrect password' })
				}
				return done(null, user)
			})
			.catch(err => {
				return done(err);
			})
	}
)

module.exports = strategy