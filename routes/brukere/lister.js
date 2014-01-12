var Lister = require(__dirname + '/../../resources/lister/lister');

var lister = function(req, res) {
  var brukerId = req.params.id;
  Lister.findByBrukerId(brukerId, function(err, lister) {
    if(err) return res.send(500);

    var sum = Lister.summerLister(lister);
    var highscore = Lister.highscore(lister);

    return res.json({lister: lister, sum: sum, highscore: highscore});
  });
};

module.exports = lister;