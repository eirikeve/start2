var bacon = require('baconjs');
var $ = require('jquery');
var hyperglue = require('hyperglue');
var map = require('lodash.map');
var filter = require('lodash.filter');
var some = require('lodash.some');
var values = require('lodash.values');
var reduce = require('lodash.reduce');
var fs = require('fs');

var createRow = function(bruker) {
  var rowTemplate = fs.readFileSync('client/templates/admin/brukere_row.html');
  return hyperglue(rowTemplate, {
    '.name a': {
      'href': '/admin/brukere/'+ bruker['_id'],
      '_text': bruker.name
    },
    '.email': bruker.email,
    '.balance span': {
      '_text': bruker.sum,
      'class': bruker.hvit ? 'hvit' : 'svart'
    },
    '.pang': (bruker.pang ? '\u2713' : '\u2718'),
    '.visible': (bruker.visible ? '\u2713' : '\u2718')
  });
};

var brukere = bacon.fromPromise($.get('/brukere'));
var brukerFilter = bacon.fromEventTarget($("#filter"), "keyup")
  .map(function(event) {
    return event.currentTarget.value;
  })
  .toProperty("");

brukere
  .combine(brukerFilter, function(brukere, brukerFilter) {
    return filter(brukere, function(bruker) {
      return some(values(bruker),function(value) {
        if(!value) return false;
        return new RegExp(brukerFilter, "i").test(value);
      });
    });
  })
  .map(function(brukere) {
    return reduce(brukere, function(acc, bruker) {
      return acc + createRow(bruker).outerHTML;
    }, '');
  })
  .assign($('.brukere tbody'), 'html');

brukere.map(Boolean).mapError(Boolean).not()
  .assign($('.loader'), 'toggle');