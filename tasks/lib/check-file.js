var esprima = require('esprima');
var disallowed = [
  'iit',
  'xit',
  'ddescribe',
  'xdescribe'
];

function traverse(object, visitor) {
  var key, child;

  visitor(object);

  for (key in object) {
    if (object.hasOwnProperty(key)) {
      child = object[key];
      if (typeof child === 'object' && child !== null) {
        traverse(child, visitor);
      }
    }
  }
}

// returns undefined || obj
module.exports = function (fileContents) {
  var res, syntax;

  try {
    syntax = esprima.parse(fileContents, {tolerant: true, loc: true});
    traverse(syntax, function (node) {
      if (node.type === 'CallExpression' && node.callee.type === 'Identifier') {
        var index = disallowed.indexOf(node.callee.name);
        if (index !== -1) {
          res = res || [];
          res.push({
            str: disallowed[index],
            line: node.callee.loc.start.line
          });
        }
      }
    });
  } catch (e) {
    // ignore file in case we failed to parse it
  }

  return res;
};
