var express = require('express');
var RedisStore = require('connect-redis')(express);
var passport = require(__dirname + '/authentication/auth');
var flash = require('connect-flash');

var configuration = require(__dirname + '/configuration');
var redisUrl = configuration.redisUrl;
var port = configuration.port;

//Auth helpers
var ensureAuthenticated = require(__dirname + '/authentication/ensureAuthenticated');
var ensureAdmin = require(__dirname + '/authentication/ensureAdmin');
var ensureAdminOrUser = require(__dirname + '/authentication/ensureAdminOrUser');

var server = express();

// configure Express
server.configure(function() {

  if(configuration.env !== 'production') {
    //Embed live-reload snippets if not in prod
    server.use(require('connect-livereload')({
      port: 35729
    }));
  }

  server.use(express.cookieParser());
  server.use(express.bodyParser());
  server.use(express.methodOverride());
  server.use(express.session({
    secret: configuration.cookieSecret,
    store: new RedisStore({
      "host": redisUrl.hostname,
      "pass": (redisUrl.auth || '').split(':')[1] || '',
      "port": redisUrl.port,
      "ttl": 3600
    })
  }));
  server.use(passport.initialize());
  server.use(passport.session());
  server.use(flash());
  server.use(server.router);
  server.use('/assets', express.static('build'));
});

//VIEWS

server.get('/', require('./routes/index'));

server.get('/nbb', ensureAuthenticated, require('./routes/nbb'));

server.all('/admin/*', ensureAdmin);

server.get('/admin', ensureAdmin, require('./routes/admin/index'));

server.get('/admin/brukere', require('./routes/admin/brukere'));

server.get('/admin/brukere/:id', require('./routes/admin/bruker'));

//server.get('/admin/brukere/ny', require('./routes/admin/ny_bruker'));

server.get('/admin/kryss', require('./routes/admin/kryss'));

server.get('/admin/innskudd', require('./routes/admin/innskudd'));

server.get('/admin/lister', require('./routes/admin/lister'));

server.get('/admin/lister/:id', require('./routes/admin/liste'));

server.get('/admin/krysseliste', require('./routes/admin/krysseliste'));

//BRUKERE API

server.get('/brukere', ensureAdmin, require('./routes/brukere/all'));

//server.post('/brukere', ensureAdmin, require('./routes/brukere/create'));

server.put('/brukere/:id', ensureAdmin, require('./routes/brukere/update'));

server.get('/brukere/:id/lister', ensureAdminOrUser, require('./routes/brukere/lister'));

// KRYSS API

server.all('/lister/*', ensureAdmin);

server.get('/lister', require('./routes/lister/all'));

server.post('/lister', require('./routes/lister/create'));

// AUTH

server.get('/auth/google',
  passport.authenticate('google', {
    failureRedirect: '/',
    failureFlash: true
  })
);

server.get('/auth/google/return',
  passport.authenticate('google', {
    successRedirect: '/nbb',
    failureRedirect: '/',
    failureFlash: true
  })
);

server.listen(port);