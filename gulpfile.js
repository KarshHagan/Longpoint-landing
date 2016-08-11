'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch');

// make vars for file paths
var paths = {
  source: 'src/assets/',
  dest: 'build/' 
};

// minify JS
gulp.task('compress', function(callback) {
  pump([
      gulp.src(paths.source + 'javascripts/**/*.js'),
      uglify(),
      gulp.dest(paths.dest + 'javascripts')
    ],
    callback
  )
  .pipe(connect.reload());
});

// minify css
gulp.task('sass', function() {
  return gulp.src(paths.source + 'scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.dest + 'styles'))
    .pipe(connect.reload())
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  })
});

gulp.task('html', function() {
  gulp.src('**/*.html')
  .pipe(connect.reload())
});

// compress images
gulp.task('smush', function() {
  gulp.src('src/assets/images/*')
  .pipe(imagemin())
  .pipe(gulp.dest('build/images'))
});

// watch for changes in css and js then compile
gulp.task('watch', function() {
  gulp.watch(paths.source + 'scss/**/*.scss', ['sass']);
  gulp.watch(paths.source + 'javascripts/**/*.js', ['compress']);
  gulp.watch('**/*.html', ['html']);
});

gulp.task('default', ['sass', 'compress', 'connect', 'watch']);