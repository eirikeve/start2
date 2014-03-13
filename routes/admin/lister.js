var fs = require('fs');
var hyperstream = require('hyperstream');
var hyperglue = require('hyperglue');
var Lister = require(__dirname + '/../../resources/lister/lister');
var map = require('lodash.map');
var moment = require('moment');

var listerTemplate = fs.readFileSync('client/templates/admin/lister.html');

var renderLister = function(lister) {
  return hyperglue(listerTemplate, {
    'tbody': map(lister.reverse(), function(liste) {
      return {
        '.kommentar': liste.kommentar,
        '.dato a':  {
          '_text': moment(liste.createdAt).format('D.M.YYYY'),
          'href': 'lister/'+liste._id
        }
      };
    })
  });
};

var render = function(req, res) {
  Lister.all(function(err, lister) {
    if(err) return res.send(500);

    var hs = hyperstream({
      'body': renderLister(lister).innerHTML
    });

    fs.createReadStream('client/templates/base.html').pipe(hs).pipe(res);
  });
};

module.exports = render;
