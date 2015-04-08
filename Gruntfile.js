module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "views/components",
          src: "**/*.jade",
          dest: "public/components",
          expand: true,
          ext: ".html"
        } ]
      }
    },
    sass: {
      options: {
        sourceMap: true
      },
      dist: {
        files: {
          'public/stylesheets/styles.css': 'sass/styles.scss',
        }
      }
    },
    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      html: {
        files: '**/*.jade',
        tasks: ['jade']
      }
    }
  });
  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default',['watch', 'sass']);
};
