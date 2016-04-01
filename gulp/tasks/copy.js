var _ = require('lodash');
var changed = require('gulp-changed');
var gulp = require('gulp');
var config = require('../config').copy;
var browserSync = require('browser-sync');

gulp.task('copy', ['clean'], function (cb) {
    _.forIn(config.src, function (dest, src) {
        gulp.src(src)
            .pipe(changed(dest))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.reload({
                stream: true
            }));
    });

    return cb();
});
