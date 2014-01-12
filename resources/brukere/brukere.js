var MongoClient = require('mongodb').MongoClient;
var configuration = require(__dirname + '/../../configuration');
var host = configuration.mongoUrl;
var hvitGrense = configuration.hvitGrense;
var Lister = require(__dirname + '/../../resources/lister/lister');
var sumKryss = require(__dirname + '/../../resources/lister/sumKryss');
var reduce = require('lodash.reduce');
var foreach = require('lodash.foreach');
var sortby = require('lodash.sortby');

var all = function(cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) return cb(err, null);

    db.collection('brukere', function(err, collection) {
      if(err) return cb(err, null);

      collection.find().toArray(function(err, items) {
        if(err) return cb(err, null);

        cb(null, items);
      });
    });
  });
};

var allMedSum = function(cb) {
  Lister.all(function(err, lister) {
    if(err) return cb(err, null);

    all(function(err, brukere){
      if(err) return cb(err, null);

      var summer = reduce(lister, function(acc, liste) {
        foreach(liste, function(kryss) {
          foreach(kryss, function(etKryss) {
            if(!acc[etKryss.id]) acc[etKryss.id] = 0;

            acc[etKryss.id] += sumKryss(etKryss, liste);
          });

        });
        return acc;
      }, {});

      foreach(brukere, function(bruker) {
        bruker.sum = summer[bruker._id] || 0;
        bruker.hvit = bruker.sum >= hvitGrense;
      });

      brukere = sortby(brukere, 'name');

      cb(null, brukere);
    });

  });
}

module.exports.all = all;
module.exports.allMedSum = allMedSum;