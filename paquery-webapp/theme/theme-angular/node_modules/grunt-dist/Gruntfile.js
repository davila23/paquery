/*
 * grunt-dist
 * 
 *
 * Copyright (c) 2015 jaywcjlove
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    dist: {
      default_options: {
        options: {

        },
        files: {
          "dist":['tasks/dist.js','tasks/_dist.js']
        }
      }
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['dist']);

};
