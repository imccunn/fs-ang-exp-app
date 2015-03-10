'use strict';

module.exports = function(grunt) {

  // Server
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-jscs');

  // Client
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-karma');
  
  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      dev: {
        src: ['Gruntfile.js', 'test/compositions_api_test.js', 'server.js', 'models/**/*.js', 'routes/**/*.js', 'app/**/*.js']
      }
    },

    jscs: {
      src: ['test/compositions_api_test.js', 'test/karma_tests/compositions_controller_test.js', 'server.js', 'models/**/*.js', 'routes/**/*.js', 'app/**/*.js'],
      options: {
        config: '.jscsrc'
      }
    },

    simplemocha: {
      all: {
        src: ['test/compositions_api_test.js']
      }
    },

    clean: {
      build: {
        src: ['build/']
      }
    },

    copy: {
      build: {
        expand: true,
        cwd: 'app/',
        src: '**/*.html',
        dest: 'build/',
        flatten: false,
        filter: 'isFile'
      }
    },

    browserify: {
      dev: {
        src: ['app/js/**/*.js'],
        dest: 'build/bundle.js'
      },
      test: {
        src: ['test/client_side/*_test.js'],
        dest: 'test/client_side/test_bundle.js'
      },
      karmatest: {
        src: ['test/karma_tests/*_test.js'],
        dest: 'test/karma_tests/karma_test_bundle.js'
      },
      options: {
        transform: ['debowerify']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js'
      }
    }
  });
  
  // Server
  grunt.registerTask('test', ['jshint', 'jscs', 'simplemocha']);
  grunt.registerTask('default', ['test']);
  
  // Client tests
  grunt.registerTask('build', ['clean', 'browserify', 'copy']);
  grunt.registerTask('build:test', ['browserify:test']);
  grunt.registerTask('test:client', ['browserify:karmatest', 'karma:unit']);
};
