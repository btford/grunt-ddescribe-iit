var disallowed = [
  'iit',
  'xit',
  'ddescribe',
  'xdescribe'
];

function disallowedIndex(largeString, disallowedString) {
  var notFunctionName = '[^A-Za-z0-9$_]';
  var regex = new RegExp('(^|' + notFunctionName + ')(' + disallowedString + ')' + notFunctionName + '*\\(', 'gm');
  var match = regex.exec(largeString);
  // Return the match accounting for the first submatch length.
  return match != null ? match.index + match[1].length : -1;
}

// returns undefined || obj
module.exports = function (fileContents) {
  var res;

  disallowed.forEach(function (str) {
    if (disallowedIndex(fileContents, str) !== -1) {
      res = res || [];
      res.push({
        str: str,
        line: fileContents.substr(0, disallowedIndex(fileContents, str)).split('\n').length
      });
    }
  });

  return res;
};
