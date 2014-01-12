var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');

var indexTemplate = fs.readFileSync('client/templates/index.html');
var errorsTemplate = fs.readFileSync('client/templates/error.html');

var buildErrors = function(errors) {
  return hyperglue(errorsTemplate, {
    '.errors': errors
  });
};

var buildIndex = function(errors) {
  return hyperglue(indexTemplate, {
    '.error-container': {
      _html: errors.length > 0 ? buildErrors(errors.join('\n')).innerHTML : ''
    }
  });
}

var render = function(req, res) {
  var errors = req.flash('error');
  var hs = hyperstream({
    'body': buildIndex(errors).innerHTML
  });
  fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
}

module.exports = render;