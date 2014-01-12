var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');

var indexTemplate = fs.readFileSync('client/templates/admin/index.html');

var buildIndex = function(req) {
  return hyperglue(indexTemplate, {
    '.name': req.user.name
  });
};

var render = function(req, res) {
  var hs = hyperstream({
    'body': buildIndex(req).innerHTML
  });

  fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
};

module.exports = render;