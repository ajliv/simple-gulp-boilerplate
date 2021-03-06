var gulp         = require('gulp');
var browserSync  = require('browser-sync');
var less 		 = require('gulp-less')
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config       = require('../config').less;
var autoprefixer = require('gulp-autoprefixer');

gulp.task('less', ['clean'], function () {
  return gulp.src(config.src)
    .pipe(sourcemaps.init())
    .pipe(less(config.settings))
    .on('error', handleErrors)
    .pipe(sourcemaps.write({
    	sourceRoot: function(file) { // set this when use less that's outside of the app directory (in node_modules, etc)
	        return './';
	    }
	}))
    .pipe(autoprefixer({
        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1'],
        remove: false
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.reload({stream:true}));
});
