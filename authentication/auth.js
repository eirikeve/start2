var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var Bruker = require(__dirname + '/../resources/brukere/bruker');

var port = process.env['PORT'] || process.argv[2] || 5000;
var domain = process.env['SERVER_DOMAIN'] || 'http://localhost:'+port;

var GOOGLE_CLIENT_ID = process.env['GOOGLE_CLIENT_ID'];
var GOOGLE_CLIENT_SECRET = process.env['GOOGLE_CLIENT_SECRET'];

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: domain + '/auth/google/callback'
  },
  function(accessToken, refreshToken, profile, done) {
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
