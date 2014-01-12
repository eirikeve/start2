var sumOl = require('./sumOl');
var sumPenger = require('./sumPenger');


var sumKryss = function(kryss, liste) {
    var ol = sumOl(kryss, liste);

    var penger = sumPenger(kryss);

    var modifier = liste.innskudd ? 1 : -1;

    return modifier*(ol + penger);
};

module.exports = sumKryss;