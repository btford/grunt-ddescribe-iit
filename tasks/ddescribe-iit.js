'use strict';

var checkFile = require('./lib/check-file');

module.exports = function (grunt) {

  grunt.registerMultiTask('ddescribe-iit', 'Check for instances of ddescribe and iit', function () {
    var task = this;

    var failed = false;
    var done = this.async();
    grunt.util.async.forEach(this.filesSrc, function (file, next) {
      if (grunt.file.isFile(file)) {
        var fileContents = grunt.file.read(file);
        var errs = checkFile(fileContents, (task.data.options ? task.data.options.exceptions : null));
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
