var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');
var Liste = require(__dirname + '/../../resources/lister/liste');
var map = require('lodash.map');
var reduce = require('lodash.reduce');

var listeTemplate = fs.readFileSync('client/templates/admin/liste.html');

var renderListe = function(liste) {
  return hyperglue(listeTemplate, {
    '.kommentar': liste.kommentar,
    '.olPris': liste.olPris,
    '.kryss tbody': map(liste.kryss, function(kryss) {
      return {
        '.bruker': kryss.bruker,
        '.ol': kryss.ol,
        '.penger': kryss.penger,
        '.sum': parseFloat(kryss.ol || 0) * parseFloat(liste.olPris) + parseFloat(kryss.penger || 0)
      }
    })
  });
};

var render = function(req, res) {
  Liste.find(req.params.id, function(err, liste) {
    if(err) return res.send(500);

    var hs = hyperstream({
      'body': renderListe(liste).innerHTML
    });

    fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
  });
};

module.exports = render;