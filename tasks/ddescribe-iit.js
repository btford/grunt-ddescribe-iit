'use strict';

var checkFile = require('./lib/check-file');

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
          var errs;
          if (errs = checkFile(file.contents)) {
            errs.forEach(function (err) {
              grunt.log.errorlns(file.name + ' has `' + err.str + '` at line ' + err.line);
            });
            failed = true;
          }
        });
    });
    if (failed) {
      grunt.fail.fatal('ddescribe-iit check failed.');
    }
  });
};
