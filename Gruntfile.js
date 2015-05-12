module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [
          {
            cwd: "components",
            src: "**/*.jade",
            dest: "public/comp",
            expand: true,
            ext: ".html"
          }
        ]
      }
    },

    sass: {
      dist: {
        files: [
          {
            cwd: "components",
            src: "**/*.scss",
            dest: "public/comp",
            expand: true,
            ext: ".css"
          },
          {
            'public/css/app.css': 'global/sass/app.scss'
          }
        ]
      }
    },

    coffee: {
      compile: {
        files: [
          {
            cwd: "components",
            src: "**/*.coffee",
            dest: "public/comp",
            expand: true,
            ext: ".js"
          },
          {
            'public/js/app.js': ['global/coffee/*.coffee'] // compile and concat into single file
          }
        ]
      }
    },

    watch: {
      html: {
        files: '**/*.jade',
        tasks: ['jade']
      },
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },
      js: {
        files: '**/*.coffee',
        tasks: ['coffee']
      }
    }

  });

  grunt.loadNpmTasks("grunt-contrib-jade");
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default',['jade', 'sass', 'coffee', 'watch']);
};
