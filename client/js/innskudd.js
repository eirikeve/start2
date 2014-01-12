var bacon = require('baconjs');
var $ = require('jquery');
var hyperglue = require('hyperglue');
var each = require('lodash.foreach');
var map = require('lodash.map');
var find = require('lodash.find');
var compact = require('lodash.compact');
var fs = require('fs');
var typeahead = require('typeahead.js');

var template = fs.readFileSync('client/templates/admin/innskudd_row.html');

//Append atleast one row
$('#innskudd form fieldset').append($(template));

var initTypeahead = function(element, data) {
  element.typeahead({
    name: 'names',
    local: data
  });
};

var brukere = bacon.fromPromise($.get('/brukere'))
  .map(function(val) {

    each(val, function(bruker) {
      bruker.value = bruker.name;
      bruker.tokens = bruker.value.split(' ');
    });

    return val;
  }).toProperty();

brukere.onValue(function(brukere) {
  initTypeahead($('input.navn'), brukere);
});

var leggTilPerson = bacon.fromEventTarget($('#ny-person'), 'click')
  .doAction('.preventDefault');

brukere.sampledBy(leggTilPerson).onValue(function(brukere) {
  var row = $(template);
  $('#innskudd form fieldset').append(row);
  initTypeahead(row.find('input.navn'), brukere);
});

var lagre = bacon.fromEventTarget($('#lagre'), 'click')
  .doAction('.preventDefault');

brukere.sampledBy(lagre).onValue(function(brukere) {
  var kommentar = $('#kommentar').val();
  var innskudd = map($('#innskudd form fieldset > div'), function(elem) {
    var $el = $(elem);
    var navn = $el.find('.navn').val();

    if(!navn) return;

    return {
      'id': find(brukere, {'name': navn})['_id'],
      'penger': $el.find('.penger').val()
    };
  });

  $.post('/lister', {
    'kommentar': kommentar,
    'innskudd': true,
    'kryss': JSON.stringify(compact(innskudd))
  })
  .done(function(data) {
    window.location.href = '/admin/lister/'+data._id;
  });
});