const { body, validationResult } = require('express-validator');
const User = require('../users/user.schema');

exports.register = [
  body('email', 'Email is invalid.').isEmail(),
  body('fullname', 'Fullname must not empty.').isLength({ min: 1 }).trim().escape(),
  body('password', 'Password must at least 4 characters.').isLength({ min: 4 }),
  body('confirmPassword', 'Confirm password is not matched.').custom((value, { req }) => value === req.body.password),

  async (req, res, next) => {
    console.log(req.body)
    const errors = validationResult(req).array();

    let existedUser = await User.findOne({ email: req.body.email });
    if (existedUser) {
      errors.push({
        msg: 'User is already existed.'
      })
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors: errors });
    }
    next();
  }
] 