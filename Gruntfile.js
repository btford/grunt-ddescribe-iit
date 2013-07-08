'use strict';
module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-cli');
  grunt.loadTasks('tasks');

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'lib/*.js',
        'tasks/*.js',
        'tests/*.js'
      ]
    },

    mochacli: {
      options: {
        require: ['should'],
        bail: true
      },
      all: ['tests/*.js']
    },
  });

  grunt.registerTask('default', ['test']);
  grunt.registerTask('test', ['mochacli']);
};
