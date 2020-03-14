var User = require('../users/user.schema');

exports.currentUser = async (req, res) => {
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body

    let user = await User.findByCredentials(email, password);
    if (!user) {
        res.status(400);
        return res.json({ message: "Email or Password is incorrect" });
    }

    // TODO: Implement user.IsActive
    req.login(user, (err) => {
        if (err) {
            res.status(400);
            return res.json({ message: "Email or Password is incorrect" });
        }
        res.json({ err: false });
    });
}


exports.register = async (req, res) => {
    const { email, password } = req.body

    // TODO: Validate register data here
    let existedUser = await User.findOne({ email: email });
    if (existedUser) {
        res.status(400);
        return res.json({ message: 'User is already existed.' });;
    }

    const newUser = new User({
        email: email,
        password: password
    })
    await newUser.save();
    return res.json({ email: newUser.email });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}
