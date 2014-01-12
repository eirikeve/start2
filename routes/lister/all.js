var Lister = require(__dirname + '/../../resources/lister/lister');

var all = function(req, res) {
  Lister.all(function(err, lister) {
    err ? res.send(500) : res.json(lister);
  });
};

module.exports = all;