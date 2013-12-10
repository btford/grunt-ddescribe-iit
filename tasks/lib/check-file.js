var disallowed = [
  'iit',
  'xit',
  'ddescribe',
  'xdescribe'
];

var whitespace = [
  ' ',
  '\n',
  '\t'
];

// returns undefined || obj
module.exports = function (fileContents) {
  var res;

  disallowed.forEach(function (str) {
    var index = 0;
    if ((index = fileContents.indexOf(str)) !== -1 &&
        (index === 0 || whitespace.indexOf(fileContents[index - 1]) > -1)) {

      res = res || [];
      res.push({
        str: str,
        line: fileContents.substr(0, fileContents.indexOf(str)).split('\n').length
      });
    }
  });

  return res;
};
