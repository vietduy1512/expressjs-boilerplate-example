const User = require('../users/user.schema');

exports.currentUser = async (req, res) => {
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
}

exports.login = (req, res) => {
    res.json({ email: req.user.email });
}

exports.register = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password
    })
    newUser.save().then(user => {
        return res.json({ email: newUser.email });
    }).catch(error => {
        return res.status(400).json({ errors: error.errors });
    });
}

exports.logout = (req, res) => {
    req.logout();
    res.clearCookie('connect.sid');
    res.end();
}
