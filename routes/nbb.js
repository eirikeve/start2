var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');

var nbbTemplate = fs.readFileSync('client/templates/nbb.html');

var buildNbb = function(req) {
  return hyperglue(nbbTemplate, {
    '.name': req.user.name,
    '#id': ''+req.user['_id']
  });
};

var render = function(req, res) {
  var hs = hyperstream({
    'body': buildNbb(req).innerHTML
  });

  fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
};

module.exports = render;