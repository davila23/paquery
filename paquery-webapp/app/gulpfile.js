var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var originScss  = 'components/**/*.scss';
var destCss     = 'css';

gulp.task('serve', ['sass'], function() {

  return browserSync.init({
    server: {
      baseDir: './'
    }
  });

});


gulp.task('sass', function() {

    gulp.src(originScss)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest(destCss))
    .pipe(browserSync.reload({
      stream: true
    }));

});

gulp.task('dev', ['serve'], function() {

  gulp.watch(originScss, ['sass']);
  gulp.watch("./**/*.js, !node_modules/**/*.js, !vendors/**/*.js").on('change', browserSync.reload);
  //gulp.watch(['api/**/*.js', '!node_modules/**/*.js', ['start']).on();

});
