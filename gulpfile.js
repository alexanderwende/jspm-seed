
var gulp = require('gulp');
var jspm = require('jspm');
var sass = require('gulp-sass');
var once = require('node-sass-import-once');
var concat = require('gulp-concat');
var replace = require('gulp-replace');
var htmlreplace = require('gulp-html-replace');
var karma = require('karma');
var del = require('del');
var _ = require('lodash');
var q = require('q');

// the build config for pages and bundles
var buildConfig = require('./build.config');

// the directories to use
var dir = {
    src: './',
    dist: 'dist/',
    js: 'js/',
    sass: 'sass/',
    css: 'css/'
};

// this is a custom build method, which reads a bundles configuration
// and builds the bundles into the dist directory
function build (config) {

    var builder = new jspm.Builder();

    var bundles = [];

    config.bundles.forEach(function (bundle) {

        var source = bundle.src.map(function (src) { return dir.src + dir.js + src; }).join(' + ');

        if (bundle.exclude) {

            source += ' - ' + bundle.exclude.map(function (src) { return dir.src + dir.js + src; }).join(' - ');
        }

        var destination = dir.dist + dir.js + (/.*\.js$/i.test(bundle.dest) ? bundle.dest : bundle.dest + '.js');

        var options = bundle.options ? _.extend({}, config.options, bundle.options) : config.options;

        bundles.push(builder.bundle(source, destination, options)
            .then(function () {
                console.log('Building %s successful.', destination);
            })
            .catch(function (error) {
                console.error('Building %s failed: %s', destination, error);
            })
        );
    });

    return q.all(bundles);
}

/************************************************
* The gulp tasks for production
************************************************/

gulp.task('clean', function () {

    return del([ dir.dist ]);
});

gulp.task('concat', ['clean'], function () {

    return gulp.src([
        './jspm_packages/system.js',
        './config.js'
    ])
    .pipe(replace(/\/\*\* build:remove \*\*\/[\s\S]*\/\*\* endbuild \*\*\//gim, ''))
    .pipe(concat('system.js'))
    .pipe(gulp.dest(dir.dist + dir.js));
});

gulp.task('copy', ['concat'], function () {

    return gulp.src('index.html')
    .pipe(htmlreplace({
        remove: '',
        js: ['js/system.js', 'js/libs.js', 'js/app.js'],
        css: 'css/app.css'
    }))
    .pipe(gulp.dest(dir.dist));
});

gulp.task('build:js', ['clean'], function () {

    return build(buildConfig);
});

gulp.task('build:sass', ['clean'], function () {

    return gulp.src(dir.src + dir.sass + '**/*.scss')
        .pipe(sass({
            outputStyle: 'compressed',
            importer: once
        }).on('error', sass.logError))
        .pipe(gulp.dest(dir.dist + dir.css));
});

gulp.task('build', ['clean', 'concat', 'copy', 'build:js', 'build:sass']);

/************************************************
* Tasks for development
*
* The sass and sass:watch tasks build the css in
* the src folder for development.
************************************************/

gulp.task('sass', function () {

    gulp.src(dir.src + dir.sass + '**/*.scss')
        .pipe(sass({
            outputStyle: 'nested',
            importer: once
        }).on('error', sass.logError))
        .pipe(gulp.dest(dir.src + dir.css));
});

gulp.task('sass:watch', function () {

    gulp.watch(dir.src + dir.sass + '**/*.scss', ['sass']);
});

/************************************************
* Tasks for running tests
*
* The test:watch tasks keeps PhantomJS alive and
* re-runs tests after each change.
************************************************/

gulp.task('test', function (done) {

    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['PhantomJS']
    }, done).start();
});

gulp.task('test:watch', function (done) {

    new karma.Server({
        configFile: __dirname + '/karma.conf.js',
        browsers: ['PhantomJS'],
        singleRun: false
    }, done).start();
});
