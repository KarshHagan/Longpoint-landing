'use strict';

var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');

// make vars for file paths
var paths = {
  source: 'src/assets/',
  dest: 'build/' 
};

// minify JS
gulp.task('compress', function(callback) {
  pump([
      gulp.src(paths.source + 'javascripts/main.js'),
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

// watch for changes in css and js then compile
gulp.task('watch', function() {
  gulp.watch(paths.source + 'scss/**/*.scss', ['sass']);
  gulp.watch(paths.source + 'javascripts/main.js', ['compress']);
  gulp.watch('**/*.html', ['html']);
});

gulp.task('default', ['sass', 'compress', 'connect', 'watch']);