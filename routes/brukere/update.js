var Bruker = require(__dirname + '/../../resources/brukere/bruker');
var validate = Bruker.validate;

var update = function(req, res) {
  var bruker = req.body;
  var brukerId = req.params.id;

  if(!validate(bruker)) {
    return res.send(400, 'Mangler navn eller epost');
  }

  Bruker.update(brukerId, bruker, function(err, bruker) {
    return err ? res.send(500) : res.send(200, bruker);
  });
};

module.exports = update;