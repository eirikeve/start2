var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');
var Brukere = require(__dirname + '/../../resources/brukere/brukere');
var foreach = require('lodash.foreach');
var map = require('lodash.map');
var reduce = require('lodash.reduce');
var sortby = require('lodash.sortby');
var configuration = require(__dirname + '/../../configuration');

var krysselisteRowTemplate = fs.readFileSync('client/templates/admin/krysseliste_row.html');

var renderKrysselisteRow = function(bruker) {
  return hyperglue(krysselisteRowTemplate, {'.navn': bruker.name});
};

var render = function(req, res) {
  Brukere.allMedSum(function(err, brukere) {
    var hvite = [], svarte = [];

    foreach(brukere, function(bruker) {
      if(bruker.sum >= configuration.hvitGrense && bruker.visible) {
        hvite.push(bruker);
      } else if(bruker.visible) {
        svarte.push(bruker);
      }
    });
    hvite = sortby(hvite, 'name');
    svarte = sortby(svarte, 'name');
    var hs = hyperstream({
      'tbody': reduce(hvite, function(acc, bruker){
        return acc + renderKrysselisteRow(bruker).outerHTML;
      },''),
      'p.svarte': map(svarte, 'name').join(', '),
      '.barsjef': configuration.barsjef,
      '.epost': configuration.barsjefEpost,
      '.telefon': configuration.barsjefTlf
    });

    fs.createReadStream('client/templates/admin/krysseliste.html').pipe(hs).pipe(res);
  });

};

module.exports = render;