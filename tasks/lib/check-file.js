function disallowedIndex(fullString, disallowedString) {
  var notFunctionName = '[^A-Za-z0-9$_]';
  var regex = new RegExp('(^|' + notFunctionName + ')(' + disallowedString + ')' + notFunctionName + '*\\(', 'm');

  var largeStrings = fullString.split('\n');
  var accumulatedLength = 0;

  for (var i = 0; i < largeStrings.length; i++) {
    var largeString = largeStrings[i];
    var match = regex.exec(largeString);
    // Return the match accounting for the first submatch length.
    if (match != null) return accumulatedLength + match.index + match[1].length;
    accumulatedLength += largeString.length + 1; // `1` to account for '\n'
  }
  return -1;
}

// returns undefined || obj
module.exports = function (fileContents, disallowed) {
  var res;

  if (disallowed instanceof Array) {

    disallowed.forEach(function (str) {
      if (disallowedIndex(fileContents, str) !== -1) {
        res = res || [];
        res.push({
          str: str,
          line: fileContents.substr(0, disallowedIndex(fileContents, str)).split('\n').length
        });
      }
    });
  }
  return res;
};
