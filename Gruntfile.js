module.exports = function(grunt) {
  'use strict';
  
  // Project configuration.
  grunt.initConfig({
    mochaWebdriver: {
      options: {
        timeout: 1000 * 60,
        reporter: 'spec'
      },
      phantom: {
        src: ['test/test.js'],
        options: {
          testName: 'phantom test',
          usePhantom: true
        }
      },
      /*promises: {
        src: ['test/promiseAPi.js'],
        options: {
          testName: 'phantom test',
          usePhantom: true,
          usePromises: true
        }
      },*/
      sauce: {
        src: ['test/test.js'],
        options: {
          testName: 'sauce test',
          concurrency: 2,
          browsers: [
            {browserName: 'internet explorer', platform: 'Windows 7', version: '9'},
            {browserName: 'internet explorer', platform: 'Windows 7', version: '8'},
            {browserName: 'chrome', platform: 'Windows 7', version: ''}
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-webdriver');

  // Default task.
  grunt.registerTask('test', ['mochaWebdriver']);
};