/* global module: false */
/**
 * Grunt Module
 */
module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        project: {
            app: 'dist',
            src: 'src',
            css: '<%= project.app %>/css',
            img: '<%= project.app %>/img',
            js: '<%= project.app %>/js',
            less: '<%= project.src %>/less',
            scss: '<%= project.src %>/scss',
            srcImg: '<%= project.src %>/img',
            srcJs: '<%= project.src %>/js',
        },
        browserify: {
            dist: {
                files: {
                    '<%= project.js %>/main.js': ['<%= project.srcJs %>/main.js']
                },
                options: {
                    browserifyOptions: {
                        debug: true
                    },
                    transform: [['babelify', { presets: ["react", "es2015"] }]],
                    plugin: [ [ 'minifyify', {
                        minify: false,
                        map: 'main.js.map',
                        output: '<%= project.js %>/main.js.map',
                        global: true}]
                    ]
                }
            }
        },
        copy: {
            main: {
                expand: true,
                src: '<%= project.src %>/*.html',
                dest: '<%= project.app %>/',
                flatten: true,
            },
            php: {
                expand: true,
                src: 'api/**/*.{php,sqlite}',
                dest: '<%= project.app %>/',
                flatten: false,
            }
        },
        jshint: {
            all: '<%= project.srcJs %>/{,*/}*.js',
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish'),
            },
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: '<%= project.srcImg %>',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= project.img %>'
                }],
            },
        },
        less: {
            options: {
                // cleancss: true, // unfortunately cleancss strips out the sourcemap comment!
                ieCompat: true,
                compress: true,
                sourceMap: true,
                sourceMapFilename: '<%= project.css %>/style.css.map',
                sourceMapRootpath: '/',
                sourceMapURL: 'style.css.map',
                sourceMapBasepath: '/',
                outputSourceFiles: true
            },
            all: {
                files: { '<%= project.css %>/style.css': '<%= project.less %>/style.less' }
            }
        },
        watch: {
            scripts: {
                files: ['<%= project.srcJs %>/**/*.{js,jsx}'],
                tasks: ['browserify:dist']
            },
            copy: {
                files: ['<%= project.src %>/**/*.html', 'api/**/*.{php,sqlite}'],
                tasks: ['copy']
            },
            less: {
                files: '<%= project.less %>/**/*.less',
                tasks: ['less']
            },
            img: {
                files: '<%= project.srcImg %>/**/*.{png,jpg,gif}',
                tasks: ['imagemin']
            },
            sass: {
                files: '<%= project.scss %>/**/*.scss',
                tasks: ['sass']
            },
            livereload: {
                // get live reload at
                // https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei
                options: {
                    livereload: true,
                },
                files: [
                    '<%= project.css %>/*.css',
                    '<%= project.img %>/*',
                    '<%= project.js %>/*.js',
                    '<%= project.app %>/*.html',
                ],
            },
            grunt: {
                files: ['Gruntfile.js', 'package.json'],
            },
        },
    });

    require('matchdep').filterAll('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('js', ['jshint', 'browserify:dist']);
    grunt.registerTask('css', ['less']);
    //grunt.registerTask('css', ['sass']);
    grunt.registerTask('img', ['imagemin']);
    grunt.registerTask('build', ['copy', 'js', 'css', 'img']);
};
