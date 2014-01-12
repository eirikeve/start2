var Liste = require(__dirname + '/../../resources/lister/liste');
var validate = Liste.validate;

var create = function(req, res) {
  var liste = req.body;

  if(!validate(liste)) {
    return res.send(400, 'Mangler liste');
  }

  Liste.create(liste, function(err, liste) {
    return err ? res.send(500) : res.send(200, liste);
  });
};

module.exports = create;