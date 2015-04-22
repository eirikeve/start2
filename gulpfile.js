var gulp = require('gulp');
var browserify = require('browserify');
var sass = require('gulp-sass');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr')();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var brfs = require('brfs');
var source = require('vinyl-source-stream');
var path = require('path');

function build(base, entrypoint) {
  var bundler = browserify(path.resolve(base, entrypoint));
  bundler.transform('brfs');
  bundler.transform('debowerify');
  return bundler.bundle({debug: true})
    .pipe(source(entrypoint))
    .pipe(gulp.dest('./build'));
}

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
  build('client/js/', 'nbb.js');
});

gulp.task('browserify-kryss', function(){
  build('client/js/', 'kryss.js');
});

gulp.task('browserify-brukere', function(){
  build('client/js/', 'brukere.js');
});

gulp.task('browserify-bruker', function(){
  build('client/js/', 'bruker.js');
});

gulp.task('browserify-innskudd', function(){
  build('client/js/', 'innskudd.js');
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
