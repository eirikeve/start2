var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');

var brukereTemplate = fs.readFileSync('client/templates/admin/brukere.html');

var buildBrukere = function() {
  return hyperglue(brukereTemplate, {});
};

var render = function(req, res) {
  var hs = hyperstream({
    'body': buildBrukere().innerHTML
  });

  fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
};

module.exports = render;