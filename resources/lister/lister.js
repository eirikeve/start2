var MongoClient = require('mongodb').MongoClient;
var reduce = require('lodash.reduce');
var foreach = require('lodash.foreach');
var filter = require('lodash.filter');

var sumKryss = require(__dirname + '/sumKryss');

var host = require(__dirname + '/../../configuration').mongoUrl;

var findByBrukerId = function(brukerId, cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) return cb(err, null);

    db.collection('lister', function(err, collection) {
      if(err) return cb(err, null);

      collection.find({'kryss.id': brukerId}).toArray(function(err, items) {
        if(err) return cb(err, null);

        fjernAndresKryss(items, brukerId);

        cb(null, items);
      });
    });
  });
};

var all = function(cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) cb(err, null);

    db.collection('lister', function(err, collection) {
      if(err) cb(err, null);

      collection.find().toArray(function(err, items) {
        if(err) cb(err, null);

        cb(null, items);
      });
    });
  });
};

var fjernAndresKryss = function(lister, brukerId) {
  foreach(lister, function(liste) {
    liste.kryss = filter(liste.kryss, {'id': brukerId});
  });
};

var summerLister = function(lister) {
  return reduce(lister, function(sum, liste) {
    return sum + summerListe(liste);
  }, 0);
};

var summerListe = function(liste) {
  return reduce(liste.kryss, function(sum, kryss) {
    return sum + sumKryss(kryss, liste);
  }, 0);
};

var highscore = function(lister) {
  return reduce(filter(lister, 'innskudd'), function(acc, liste) {
    return acc + reduce(liste.kryss, function(score, kryss) {
      var penger = parseFloat(kryss.penger);
      return score + (penger > 0 ? penger : 0);
    }, 0);
  }, 0);
}

module.exports.findByBrukerId = findByBrukerId;
module.exports.summerLister = summerLister;
module.exports.all = all;
module.exports.highscore = highscore;