var mongo = require('mongodb');

var MongoClient = mongo.MongoClient;
var ObjectID = mongo.ObjectID;

var host = require(__dirname + '/../../configuration').mongoUrl;

var validate = function(bruker) {
  return bruker.name && bruker.email;
};

var update = function(id, newData, cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) return cb(err, null);

    db.collection('brukere', function(err, collection) {
      if(err) return cb(err, null);

      collection.findAndModify(
        {'_id': new ObjectID(id)},
        [],
        {'$set': {
          'name': newData.name,
          'email': newData.email,
          'pang': newData.pang === 'true',
          'visible': newData.visible === 'true',
          'updatedAt': new Date()
        }},
        {'new': true},
        function(err, item) {
          if(err) return cb(err, null);
          return cb(null, item);
        });
    });
  });
};

var findByEmail = function(email, cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) return cb(err, null);

    db.collection('brukere', function(err, collection) {
      if(err) return cb(err, null);

      collection.findOne({'email': email}, function(err, item) {
        if(err) return cb(err, null);

        cb(null, item);
      });
    });
  });
};

var find = function(id, cb) {
  MongoClient.connect(host, function(err, db) {
    if(err) return cb(err, null);

    db.collection('brukere', function(err, collection) {
      if(err) return cb(err, null);

      collection.findOne({'_id': new ObjectID(id)}, function(err, item) {
        if(err) return cb(err, null);

        cb(null, item);
      });
    });
  });
};

module.exports.validate = validate;
module.exports.update = update;
module.exports.findByEmail = findByEmail;
module.exports.find = find;