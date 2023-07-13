module.exports = function isAuthenticated (req, res, next) {
    if (req.session.user) {
        // user logged in
        res.locals.loggedIn = true;
        res.locals.username = req.session.user.name;
      } else {
        // user log out
        res.locals.loggedIn = false;
        res.locals.username = '';
      }
      next();
  }
  