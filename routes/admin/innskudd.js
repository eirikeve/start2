var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');

var kryssTemplate = fs.readFileSync('client/templates/admin/innskudd.html');

var renderInnskudd = function() {
  return hyperglue(kryssTemplate, {});
};

var render = function(req, res) {
  var hs = hyperstream({
    'body': renderInnskudd().innerHTML
  });

  fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
};

module.exports = render;