'use strict';

var checkFile = require('./lib/check-file');

module.exports = function (grunt) {

  grunt.registerMultiTask('ddescribe-iit', 'Check for instances of ddescribe and iit', function () {
    var failed = false;
    var defaultDisallowed = ['iit', 'xit', 'ddescribe', 'xdescribe'];
    var done = this.async();
    var options = this.options({
      // Default values
      disallowed: defaultDisallowed
    });
    // Check that disallowed keywords are permitted (can indicate a usage bug)
    var unknownKeyword = false;
    options.disallowed.forEach(function (str) {
      if (defaultDisallowed.indexOf(str) === -1) {
        grunt.log.errorlns('Unknown disallowed keyword ' + str);
        unknownKeyword = true;
      }
    });
    if (unknownKeyword) {
      grunt.warn('ddescribe-iit check failed.');
    }

    grunt.util.async.forEach(this.filesSrc, function (file, next) {
      if (grunt.file.isFile(file)) {
        var fileContents = grunt.file.read(file);
        var errs = checkFile(fileContents, options.disallowed);
        if (errs) {
          errs.forEach(function (err) {
            grunt.log.errorlns(file + ' has `' + err.str + '` at line ' + err.line);
          });
          next(true);
        }
      }
      next();
    }, function (failed) {
      if (failed) {
        grunt.warn('ddescribe-iit check failed.');
      }
      done();
    });
  });
};
