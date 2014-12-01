module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
		      src: ['js/plugins.js', 'js/script.js'],
		      dest: '../site/js/script.js'
		    }
        },
        
        jshint: {
		  files: ['js/*.js'],
		},

		uglify: {
			my_target: {
				files: {
					'../site/js/script.js': '../site/js/script.js'
				}
			}
		},
		
		imagemin: {
		    dynamic: {
		    	options: {
			        optimizationLevel: 7
			    },
		        files: [{
		            expand: true,
		            cwd: '../site/img/',
		            src: ['**/*.{png,jpg,gif}'],
		            dest: '../site/img/'
		        }]
		    }
		},

		compass: {
			dist: {
	        	options: {
	        		sassDir: 'SASS',
	        		cssDir: '../site/css/',
	        		environment: 'production',
	        		outputStyle: 'compressed'
	        	},
	        },
	    },
		
		watch: {
			options: {
		        livereload: true,
		    },
		    scripts: {
		    	files: 'js/{,*/}*.js',
		        tasks: ['jshint', 'concat', 'uglify'],
		        options: {
		        	style: 'compressed',
		            spawn: false,
		        },
		    },
		    sass: {
			    files: ['SASS/**/*.{scss,sass}'],
			    tasks: ['compass'],
			    options: {
			        spawn: false,
			    }
			}
		}

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('deploy', ['concat', 'imagemin', 'compass']);

};