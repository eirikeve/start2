var ensureAdminOrBruker = function(req, res, next) {
  if(req.isAuthenticated()) {
    if(req.user['_id'] == req.params.id || req.user.admin) {
      return next();
    } else {
      return res.send(401);
    }
  }
  res.redirect('/');
};

module.exports = ensureAdminOrBruker;