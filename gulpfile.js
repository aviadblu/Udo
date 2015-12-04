var gulp = require("gulp"),
    util = require("gulp-util"),
    sass = require("gulp-sass"),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    log = util.log,
    inject = require('gulp-inject'),
    livereload = require('gulp-livereload');

gulp.task('injectIndex', function () {
    var target = gulp.src('./client/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src(['./client/modules/**/*.js', './client/modules/**/*.css'], {read: false});

    return target.pipe(inject(sources, {relative: true}))
        .pipe(gulp.dest('./client'))
        .pipe(livereload());
});

gulp.task('styles', function () {
    return gulp.src('./client/scss/*.scss')
        .pipe(sass({style: 'expanded'}))
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
        .pipe(gulp.dest('./client/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('./client/css'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('./client/scss/*.scss', ['styles']);
    gulp.watch('./client/**/*.html', ['injectIndex']);
    gulp.watch('./client/**/*.js', ['injectIndex']);
});


gulp.task('default', ['injectIndex', 'watch'], function () {

});