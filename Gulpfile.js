'use strict';

(function () {
  var gulp = require('gulp');
  var browserify = require('browserify');
  var source = require('vinyl-source-stream');
  var buffer = require('vinyl-buffer');
  var browserSync = require('browser-sync');
  var watchify = require('watchify');
  var server = require('gulp-server-livereload');
  var assign = require('lodash.assign');
  var sourcemaps = require('gulp-sourcemaps');
  var postcss = require('postcss');
  var sass = require('gulp-sass');
  var gutil = require('gulp-util');
  var prettyHrtime = require('pretty-hrtime');

  var reload = browserSync.reload();

  var handleErrors = function () {
    var args = Array.prototype.slice.call(arguments);

    notify.onError({
      title: 'Compile Error',
      message: '<%= error.message %>'
    }).apply(this, args);

    console.log(this.end());
    return this.emit('end');
  }

  var config = (function () {
    var src, dest, _config;

    src = 'src';
    dest = 'dist';

    _config = {
      src: src,
      dest: dest,

      script: {
        src: src + '/scripts/**/*.js',
        entry: src + '/scripts/app.js',
        dest: dest + '/js'
      },

      style: {
        src: src + '/styles/style.scss',
        watch: src + '/styles/**/*.*',
        dest: dest + '/css'
      }
    };

    return _config;
  })();

  gulp.task('browserify', function () {
    var bundle, bundler, options;

    options = {
      cache: {},
      packageCache: {},
      fullPaths: false,
      entries: [config.script.entry],
      extensions: ['.js'],
      debug: true
    };

    bundler = watchify(browserify(options));

    bundle = function () {
      return bundler
        .bundle()
        .on('error', handleErrors)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.script.dest));
    }

    bundler.on('update', bundle);

    return bundle();
  });

  gulp.task('style', function () {
    gulp.src(config.style.src)
      .pipe(sass().on('error', handleErrors))
      .pipe(gulp.dest(config.style.dest));
  })

  gulp.task('watch', function () {
    gulp.watch(config.style.src, ['style', reload]);
    return gulp.watch(config.script.src, ['browserify', reload]);
  });


  gulp.task('default', ['browserify', 'style', 'watch']);
})();
