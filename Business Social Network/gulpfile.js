var gulp = require('gulp');
var concat = require('gulp-concat');
var flatten = require('gulp-flatten');
var runSequence = require('run-sequence');
var nodemon = require('gulp-nodemon');
var del = require('del');

var srcJs = ['AppModules/*/views/**/*.js'];
var srcHtml = ['AppModules/*/views/**/*.html'];
var srcAssets = ['AppModules/*/views/assets/*'];
var srcToClean = ['public/partials/*', 'public/js/*', '!public/js/mainApp.js', 'public/assets/*'];

gulp.task('clean', function () {
	del.sync(srcToClean);
});

gulp.task('collect-angular-js',function(){
  gulp.src(srcJs)
      .pipe(concat('controllers.js'))
      .pipe(gulp.dest('public/js'));

});

gulp.task('collect-angular-partials',function(){
  gulp.src(srcHtml)
      .pipe(flatten({ includeParents: 1}))
      .pipe(gulp.dest('public/partials'));

});

gulp.task('collect-assets',function(){
  gulp.src(srcAssets)
			.pipe(flatten({ includeParents: 1}))
      .pipe(gulp.dest('public/assets'));

});

gulp.task('start', function () {
  nodemon({
    script: 'app.js',
    ext: 'js html',
    ignore: ['public/js/controllers.js', 'public/partials/'],
    tasks: ['setup'],
    env: { 'NODE_ENV': 'development' }
  })
});

gulp.task('setup', function(){
	runSequence(
    'clean',
    'collect-angular-js',
		'collect-angular-partials',
		'collect-assets'
  );
});

gulp.task('default', function() {

  runSequence(
		'setup',
    'start',
    function (error) {
      if (error) {
        console.log(error.message);
      }
    });

});
