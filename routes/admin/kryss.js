var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');

var kryssTemplate = fs.readFileSync('client/templates/admin/kryss.html');

var buildKryss = function() {
  return hyperglue(kryssTemplate, {});
};

var render = function(req, res) {
  var hs = hyperstream({
    'body': buildKryss().innerHTML
  });

  fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
};

module.exports = render;