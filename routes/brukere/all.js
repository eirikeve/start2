var Brukere = require(__dirname + '/../../resources/brukere/brukere');

var all = function(req, res) {
  Brukere.allMedSum(function(err, brukere) {
    err ? res.send(500) : res.json(brukere);
  });
};

module.exports = all;