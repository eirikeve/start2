var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var Bruker = require(__dirname + '/../resources/brukere/bruker');

var port = process.env['PORT'] || process.argv[2] || 5000;
var domain = process.env['SERVER_DOMAIN'] || 'http://localhost:'+port;

passport.use(new GoogleStrategy({
    returnURL: domain + '/auth/google/return',
    realm: domain
  },
  function(identifier, profile, done) {
    var email = profile.emails[0].value;
    Bruker.findByEmail(email, function(err, bruker) {
      if(err || !bruker) done(null, false, {message: "Fant ingen bruker med eposten: " + email});
      done(null, bruker);
    });
  }
));

passport.serializeUser(function(bruker, done) {
  done(null, bruker._id);
});

passport.deserializeUser(function(id, done) {
    Bruker.find(id, function(err, bruker){
      if(err || !bruker) done(null, false, {message: "Ugyldig sessjon."});
      done(null, bruker);
  });
});

exports = module.exports = passport;