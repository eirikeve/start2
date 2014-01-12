var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');
var Bruker = require(__dirname + '/../../resources/brukere/bruker');

var brukerTemplate = fs.readFileSync('client/templates/admin/bruker.html');
var brukerForm = fs.readFileSync('client/templates/admin/bruker_form.html');

var renderBrukerForm = function(bruker) {
  return hyperglue(brukerForm, {
    '#name': {
      value: bruker.name
    },
    '#email': {
      value: bruker.email
    },
    '#pang': bruker.pang ? {
      checked: ''
    } : {},
    '#visible': bruker.visible ? {
      checked: ''
    } : {},
    '#id': bruker._id.toString()
  });
};

var buildBruker = function(bruker) {
  return hyperglue(brukerTemplate, {
    '#bruker': {_html: renderBrukerForm(bruker).innerHTML }
  });
};

var render = function(req, res) {
  Bruker.find(req.params.id, function(err, bruker) {
    if(err) return res.send(500);

    var hs = hyperstream({
      'body': buildBruker(bruker).innerHTML
    });

    fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
  });
};

module.exports = render;