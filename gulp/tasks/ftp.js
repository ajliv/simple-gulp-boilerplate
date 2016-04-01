var gulp = require('gulp');
var sftp = require('gulp-sftp');
var config = require('../config').deploy;

gulp.task('ftp:dev', ['markup', 'images', 'fonts', 'minifyCss', 'uglifyJs'], function() {
	return gulp.src(config.src)
        .pipe(sftp(config.dev));
});

gulp.task('ftp:staging', ['markup', 'images', 'fonts', 'minifyCss', 'uglifyJs'], function() {
	return gulp.src(config.src)
        .pipe(sftp(config.staging));
});

gulp.task('ftp:production', ['markup', 'images', 'fonts', 'minifyCss', 'uglifyJs'], function() {
	return gulp.src(config.src)
        .pipe(sftp(config.production));
});
