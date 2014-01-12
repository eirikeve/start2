var gulp = require('gulp');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr')();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var brfs = require('brfs');

gulp.task('sass', function(){
  gulp.src(['client/sass/style.scss', 'client/sass/krysseliste.scss'])
    .pipe(sass({
      includePaths: ['client/sass/']
    }))
    .pipe(gulp.dest('./build'))
    .pipe(refresh(lr));
});

gulp.task('copy-bower', function() {
  gulp.src('bower_components/pure/pure-min.css')
    .pipe(gulp.dest('./build'));
});

gulp.task('browserify-nbb', function(){
  gulp.src('client/js/nbb.js')
    .pipe(browserify({
      debug: true,
      transform: ['brfs', 'debowerify']
     }))
    .pipe(gulp.dest('./build'))
    .pipe(refresh(lr));
});

gulp.task('browserify-kryss', function(){
  gulp.src('client/js/kryss.js')
    .pipe(browserify({
      debug: true,
      transform: ['brfs', 'debowerify']
     }))
    .pipe(gulp.dest('./build'))
    .pipe(refresh(lr));
});

gulp.task('browserify-brukere', function(){
  gulp.src('client/js/brukere.js')
    .pipe(browserify({
      debug: true,
      transform: ['brfs', 'debowerify']
     }))
    .pipe(gulp.dest('./build'))
    .pipe(refresh(lr));
});

gulp.task('browserify-bruker', function(){
  gulp.src('client/js/bruker.js')
    .pipe(browserify({
      debug: true,
      transform: ['brfs', 'debowerify']
     }))
    .pipe(gulp.dest('./build'))
    .pipe(refresh(lr));
});

gulp.task('browserify-innskudd', function(){
  gulp.src('client/js/innskudd.js')
    .pipe(browserify({
      debug: true,
      transform: ['brfs', 'debowerify']
     }))
    .pipe(gulp.dest('./build'))
    .pipe(refresh(lr));
});

gulp.task('build', function() {
  gulp.run('copy-bower', 'sass', 'browserify-bruker', 'browserify-kryss', 'browserify-brukere', 'browserify-nbb', 'browserify-innskudd');
});

gulp.task('watch', function() {
  lr.listen(35729, function(err) {
    if(err) return console.log(err);

    gulp.watch('client/sass/*.scss', function() {
      gulp.run('sass');
    });

    gulp.watch('client/js/kryss.js', function() {
      gulp.run('browserify-kryss');
    });

    gulp.watch('client/js/nbb.js', function() {
      gulp.run('browserify-nbb');
    });

    gulp.watch('client/js/brukere.js', function() {
      gulp.run('browserify-brukere');
    });

    gulp.watch('client/js/bruker.js', function() {
      gulp.run('browserify-bruker');
    });

    gulp.watch('client/js/innskudd.js', function() {
      gulp.run('browserify-innskudd');
    });
  });
});