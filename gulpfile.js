// gulp
var gulp = require('gulp');

// plugins
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var clean = require('gulp-clean');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var ghPages = require('gulp-gh-pages');

// tasks
gulp.task('lint', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});
gulp.task('clean', function() {
    gulp.src('./dist/*')
      .pipe(clean({force: true}));
    gulp.src('./app/js/bundled.js')
      .pipe(clean({force: true}));
});
gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src(['./app/**/*.css', '!./app/bower_components/**'])
    .pipe(minifyCSS(opts))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('minify-js', function() {
  gulp.src(['./app/**/*.js', '!./app/bower_components/**'])
    .pipe(uglify({
      // inSourceMap:
      // outSourceMap: "app.js.map"
    }))
    .pipe(gulp.dest('./dist/'))
});
gulp.task('copy-bower-components', function () {
  gulp.src('./app/bower_components/**')
    .pipe(gulp.dest('dist/bower_components'));
});
gulp.task('copy-html-files', function () {
  gulp.src('./app/**/*.html')
    .pipe(gulp.dest('dist/'));
});
gulp.task('copy-image-files', function () {
  gulp.src('./app/images/*')
    .pipe(gulp.dest('dist/images/'));
});
gulp.task('connect', function () {
  connect.server({
    root: 'app/',
    port: 8888
  });
});
gulp.task('connectDist', function () {
  connect.server({
    root: 'dist/',
    port: 9998
  });
});
gulp.task('browserify', function() {
  gulp.src(['app/js/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./app/js'))
});
gulp.task('browserifyDist', function() {
  gulp.src(['app/js/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundled.js'))
  .pipe(gulp.dest('./dist/js'))
});
gulp.task('gh-pages', function() {
  gulp.src('CNAME')
    .pipe(gulp.dest('dist/'));
  return gulp.src('./dist/**/*')
    .pipe(ghPages({remoteUrl: 'git@github.com:solsupreme/solsupreme.github.io.git', branch: 'master'}));
});
//.pipe(gulp.dest('app/images/'));
// default task
gulp.task('default',
  ['clean', 'lint', 'browserify', 'connect']
);
// build task
gulp.task('build',
  ['clean', 'lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-image-files', 'copy-bower-components', 'connectDist']
);
gulp.task('deploy',
  ['clean', 'lint', 'minify-css', 'browserifyDist', 'copy-html-files', 'copy-image-files', 'copy-bower-components']
);