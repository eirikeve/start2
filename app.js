var fs = require('fs');
var restify = require('restify');

var server = restify.createServer();
server.get('/', function(req, res, next) {
    fs.createReadStream('client/index.html').pipe(res);
});

server.get('/bundle.js', function(req, res, next) {
    fs.createReadStream('client/bundle.js').pipe(res);
});

var port = process.env.PORT || 5000;

server.listen(port);