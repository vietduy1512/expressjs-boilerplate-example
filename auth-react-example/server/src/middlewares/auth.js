

module.exports.isAuthenMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
      next();
  } else {
      res.redirect('/');
  }
}


module.exports.isNotAuthenMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
      next();
  } else {
      res.redirect('/');
  }
}

exports.isAdminMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) {
      let user = req.user;
      if (user.isAdmin)
          return next();
  }
  res.redirect('/admins/login');
}

exports.isAuthorized = (req, res, next) => {
  if (req.isAuthenticated()) {
      let user = req.user;
      let id = req.params.id;
      if (user._id.toHexString() === id)
          return next();
  }
  res.redirect('/');
}
