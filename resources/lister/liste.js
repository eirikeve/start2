var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;
var host = require(__dirname + '/../../configuration').mongoUrl;
var Brukere = require(__dirname + '/../../resources/brukere/brukere');
var foreach = require('lodash.foreach');
var findWhere = require('lodash.find');

var create = function(data, cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) return cb(err, null);

    db.collection('lister', function(err, collection) {
      if(err) return cb(err, null);

      collection.insert([{
        kommentar: data.kommentar,
        olPris: data.olPris,
        kryss: JSON.parse(data.kryss),
        innskudd: data.innskudd,
        createdAt: new Date()
      }],
      {safe: true},
      function(err, item) {
        if(err) return cb(err, null);

        cb(null, item[0]);
      });
    });
  });
};

var find = function(id, cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) return cb(err, null);

    db.collection('lister', function(err, collection) {
      if(err) return cb(err, null);

      collection.findOne({'_id': new ObjectID(id)}, function(err, item) {
        if(err) return cb(err, null);

        addUsernames(item, cb);
      });
    });
  });
};

var addUsernames = function(liste, cb) {
  Brukere.all(function(err, brukere) {
    if(err) return cb(err, null);

    foreach(liste.kryss, function(kryss) {
      var bruker = findWhere(brukere, function(bruker) {
        return bruker._id.toString() === kryss.id;
      });
      if(bruker) {
        kryss.bruker = bruker.name;
      }
    });

    cb(null, liste);

  });

};

var validate = function(liste) {
  return !!liste;
}

module.exports.create = create;
module.exports.validate = validate;
module.exports.find = find;