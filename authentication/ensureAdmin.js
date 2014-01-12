var ensureAdmin = function(req, res, next) {
  if(req.isAuthenticated()) {
    if(req.user.admin) {
      return next();
    } else {
      return res.send(401);
    }
  }
  res.redirect('/');
};

module.exports = ensureAdmin;