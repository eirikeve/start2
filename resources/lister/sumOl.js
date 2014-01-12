var sumOl = function(kryss, liste) {
  var antallOl = kryss.ol || 0;
  var olPris = liste.olPris || 0;

  return parseFloat(antallOl) * parseFloat(olPris);
};

module.exports = sumOl;