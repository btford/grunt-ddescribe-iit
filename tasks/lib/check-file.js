var disallowed = [
  'iit',
  'xit',
  'ddescribe',
  'xdescribe'
];

// returns undefined || obj
module.exports = function (fileContents) {
  var res;

  disallowed.forEach(function (str) {
    if (fileContents.indexOf(str) !== -1) {
      res = res || [];
      res.push({
        str: str,
        line: fileContents.substr(0, fileContents.indexOf(str)).split('\n').length
      });
    }
  });

  return res;
};
