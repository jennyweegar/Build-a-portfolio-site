module.exports = function(grunt) {

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
          options: {
              sourcemap: 'none',
              update : true,
          },
          dist: {
            files: [{
              expand: true,
              cwd: 'css/src_sass',
              src: ['*.scss', '*.sass'],
              dest: 'css/sass_to_css',
              ext: '.css'
            }]
          }
        },

        autoprefixer: {
            dist: {
                files: [{
                  expand: true,
                  cwd: 'css/sass_to_css',
                  src: '*.css',
                  dest: 'css/sass_to_css'
                },
                {
                  expand: true,
                  cwd: 'css/src_css',
                  src: '*.css',
                  dest: 'css/src_css'
                }]
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: 0
            },
            combine : {
                files: {
                    'css/global.min.css': ['css/src_css/*.css', 'css/sass_to_css/*.css']
                },
            },
        },

        responsive_images: {
          dev: {
            options: {
              engine: 'gm',
              sizes: [
                {
                  width: 1300,
                  name: 'lg',
                  quality: 30
                },
                {
                  width: 800,
                  name: 'md',
                  quality: 30
                },
                {
                  width: 500,
                  name: 'sm',
                  quality: 30
                },
                {
                  width: 350,
                  name: 'xs',
                  quality: 30
                },
              ]
            },

            files: [{
              expand: true,
              src: ['*.{gif,jpg,png}'],
              cwd: 'images/images_src',
              dest: 'images/images_src'
            }]
          }
        },

        watch: {
          styles: {
            files: ['css/src_css/*.css', 'css/src_sass/*.{sass,scss}'],
            tasks: ['sass', 'autoprefixer', 'cssmin'],
            options: {
              spawn: false,
            },
          },

          images: {
            files: ['images/images_src/*.{gif,jpg,jpeg,png}'],
            tasks: ['responsive_images'],
            options: {
              spawn: false,
            },
          }

        },

    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['responsive_images']);

};