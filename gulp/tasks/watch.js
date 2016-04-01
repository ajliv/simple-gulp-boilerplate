/* Notes:
   - gulp/tasks/browserify.js handles js recompiling with watchify
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var _ = require('lodash');
var gulp = require('gulp');
var watch = require('gulp-watch');
var config = require('../config');
var watchify = require('./browserify');

var copySrc = _.map(config.copy.src, function (dest, src) {
    return src;
});

gulp.task('watch', ['watchify', 'browserSync', 'clean'], function(callback) {
    watch(config.less.watchSrc, function () {
        gulp.start('less');
    });
    watch(config.images.src, function () {
        gulp.start('images');
    });
    watch(config.markup.src, function () {
        gulp.start('markup');
    });
    watch(copySrc, function () {
        gulp.start('copy');
    });
    // Watchify will watch and recompile our JS, so no need to gulp.watch it
});
