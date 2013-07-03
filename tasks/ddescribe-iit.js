'use strict';

var disallowed = [
  'iit',
  'xit',
  'ddescribe',
  'xdescribe'
];

module.exports = function (grunt) {

  grunt.registerMultiTask('ddescribe-iit', 'Check for instances of ddescribe and iit', function () {
    var failed = false;
    this.files.forEach(function (glob) {
      glob.src
        .map(function (file) {
          return {
            name: file,
            contents: grunt.file.read(file)
          };
        })
        .forEach(function (file) {
          disallowed.forEach(function (thing) {
            if (file.contents.indexOf(thing) !== -1) {
              var line = file.contents.substr(0, file.contents.indexOf(thing)).split('\n').length;
              grunt.log.errorlns(file.name + ' has `' + thing + '` at line ' + line);
              failed = true;
            }
          });
        });
    });
    if (failed) {
      grunt.fail.fatal('ddescribe-iit check failed.');
    }
  });
};
