function sumToString(sum) {
  var sumString = sum.toString();

  var returnString = sumString.slice(-3),
      sumString = sumString.substr(0, sumString.length - 3);

  while (sumString.length > 3) {
    var digits = sumString.slice(-3),
        sumString = sumString.substr(0, sumString.length - 3);

    returnString = digits + ' ' + returnString;
  }

  if (sumString.length > 0) {
    if (sumString.length == 1 && sumString[0] == '-')
      returnString = sumString + returnString;
    else
      returnString = sumString + ' ' + returnString;
  }

  returnString += ' kr';

  return returnString;
};

module.exports = sumToString;
