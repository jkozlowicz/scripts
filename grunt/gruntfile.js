/* Sample directory Structure:

bin  tree ../static -d
../static
├── css
│   └── dist
├── fonts
│   └── aileron
├── images
├── js
│   ├── dist
│   └── libs
└── sass
    └── partials

*/




module.exports = function(grunt) {

    var jsSrc = '../static/js',
        jsDest = '../static/js/dist',
        cssSrc = '../static/css',
        cssDest = '../static/css/dist';

    var version = '1.0.1';

// Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {

            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                preserveComments: false
            },

            target: {
                files: [
                    {
                        src: [
                            jsSrc + '/generics.js',
                            jsSrc + '/requests.js',
                            jsSrc + '/fareRequest.js',
                            jsSrc + '/*.js',
                            '!' + jsSrc + '/**/*.min.js',
                            '!' + jsSrc + '/main.js'
                        ],
                        dest: jsDest + '/<%= pkg.name %>_' + version + '.min.js'
                    },
                    {
                        src: [
                            jsSrc + '/libs/underscore.js',
                            jsSrc + '/libs/moment.js',
                            jsSrc + '/libs/*.js',
                            '!' + jsSrc + '/**/*.min.js'
                        ],
                        dest: jsDest + '/<%= pkg.name %>_libs.min.js'
                    }
                ]
            }

        },

        cssmin: {

            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                preserveComments: false
            },

            target: {
                files: [
                    {
                        src: [
                            cssSrc + '/**/*.css',
                            '!' + cssSrc + '/**/*.min.css'
                        ],
                        dest: cssDest + '/<%= pkg.name %>_' + version + '.min.css'
                    }
                ]
            }
        },

        copy: {
            js: {
                files: [
                    {
                        cwd: jsSrc + '/libs/',    // set working folder / root to copy
                        src: '**/*.min.js',       // copy all files and subfolders
                        dest: jsDest,             // destination folder
                        expand: true              // required when using cwd
                    }
                ]
            },
            css: {
                files: [
                    {
                        cwd: cssSrc + '/',    // set working folder / root to copy
                        src: ['**/*.min.css', '!' + 'dist/*min.css'],
                        dest: cssDest,             // destination folder
                        expand: true              // required when using cwd
                    }
                ]
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', ['uglify', 'cssmin', 'copy']);

};
