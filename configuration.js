var mongoUrl = process.env['MONGODB_URI'] || 'mongodb://localhost:27017/nbb';
var redisUrl = require('url').parse(process.env['REDISCLOUD_URL'] || 'redis://localhost:6379');
var port = process.env['PORT'] || process.argv[2] || 5000;
var env = process.env['NODE_ENV'] || 'development';
var cookieSecret = process.env['COOKIE_SECRET'] ||'development';
var hvitGrense = process.env['HVIT_GRENSE'] || 500;
var barsjef = process.env['BARSJEF'] || 'Noen';
var barsjefEpost = process.env['BARSJEF_EPOST'] || 'noen@epost.no';
var barsjefTlf = process.env['BARSJEF_TLF'] || '123 45 678';

module.exports.mongoUrl = mongoUrl;
module.exports.redisUrl = redisUrl;
module.exports.port = port;
module.exports.env = env;
module.exports.cookieSecret = cookieSecret;
module.exports.hvitGrense = hvitGrense;
module.exports.barsjef = barsjef;
module.exports.barsjefTlf = barsjefTlf;
module.exports.barsjefEpost = barsjefEpost;
