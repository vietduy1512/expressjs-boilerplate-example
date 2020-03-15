

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
}


module.exports.isNotAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  } else {
    res.status(401).end();
  }
}

exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    if (user.isAdmin) {
      return next();
    }
  }
  res.status(401).end();
}

exports.isAuthorized = (req, res, next) => {
  if (req.isAuthenticated()) {
    let user = req.user;
    let id = req.params.id;
    if (user._id.toHexString() === id) {
      return next();
    }
  }
  res.status(401).end();
}
