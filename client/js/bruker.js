var bacon = require('baconjs');
var $ = require('jquery');
var sortBy = require('lodash.sortby');
var reduce = require('lodash.reduce');
var first = require('lodash.first');
var fs = require('fs');
var moment = require('moment');
var hyperglue = require('hyperglue');

var sumOl = require('../../resources/lister/sumOl.js');
var sumPenger = require('../../resources/lister/sumPenger.js');
var sumKryss = require('../../resources/lister/sumKryss.js');
var sumToString = require('./sumToString.js');


//Disable native behavior of form
$('#bruker').submit(function(e){
  return false;
});

var propertyFromInput = function(field) {
  var value = function() {
      return field.val();
  };
  return bacon.fromEventTarget(field, 'keyup')
      .map(value)
      .toProperty(value());
};

var propertyFromCheckbox = function(checkbox) {
  var isChecked = function() {
      return !!checkbox.prop('checked');
  };
  return bacon.fromEventTarget(checkbox, 'change')
      .map(isChecked)
      .toProperty(isChecked());
};

var createRow = function(liste) {
  var rowTemplate = fs.readFileSync('client/templates/nbb_row.html');
  var kryss = first(liste.kryss);

  return hyperglue(rowTemplate, {
    '.dato': moment(liste.createdAt).format('D.M.YYYY HH:mm'),
    '.ol': liste.innskudd ? '-' : sumToString(sumOl(kryss, liste)),
    '.penger': sumToString(sumPenger(kryss)),
    '.sum': sumToString(sumKryss(kryss, liste)),
    '.kommentar': liste.kommentar || ''
  });
};

var name = propertyFromInput($('#name'));
var email = propertyFromInput($('#email'));
var pang = propertyFromCheckbox($('#pang'));
var visible = propertyFromCheckbox($('#visible'));

var bruker = bacon.combineTemplate({
  'name': name,
  'email': email,
  'pang': pang,
  'visible': visible
});

var lagre = bacon.fromEventTarget($('[type=submit]'), 'click')
  .doAction('.preventDefault');

var lagretBruker = bruker.sampledBy(lagre)
  .flatMapLatest(function(bruker) {
    return bacon.fromPromise($.ajax({
      'url': '/brukere/'+$('#id').text(),
      'type': 'PUT',
      'data': bruker
    }));
  });

lagretBruker.map(Boolean).mapError(Boolean).not()
  .merge(lagre.map(Boolean))
  .assign($('.loader-small'), 'toggle');

lagretBruker.map(Boolean).not().mapError(Boolean)
  .assign($('.error'), 'toggle');

lagretBruker.mapError(function(e) {
      return e.responseText;
  })
  .assign($('.error'), 'html');

lagretBruker.map(Boolean)
  .assign($('.lagret'), 'toggle');

var lister = bacon.fromPromise($.get('/brukere/'+$('#id').text()+'/lister'));

lister.map('.lister')
  .map(function(kryss) {
    var sorted = sortBy(kryss, '.createdAt').reverse();
    return reduce(sorted, function(acc, liste) {
      return acc + createRow(liste).outerHTML;
    }, '');
  })
  .assign($('tbody'), 'html');

lister.map(Boolean).mapError(Boolean).not()
  .assign($('.loader'), 'toggle');

lister.map('.sum').map(sumToString).assign($('#balance'), 'text');
lister.map('.sum').onValue(function(sum) {
  $('#balance').addClass(sum < 400 ? 'svart' : 'hvit');
});
