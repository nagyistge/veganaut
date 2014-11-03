'use strict';
/**
 * Gulp build file for Veganaut.
 * The build is work in progress and is not fully functional yet.
 */
var gulp = require('gulp');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var ejs = require('gulp-ejs');
var tap = require('gulp-tap');

var files = {
    js: [
        'app/components/**/*.js',
        'app/veganaut/app.js',
        'app/veganaut/**/*.js'
    ],
    jsLib: [
        'app/lib/lodash/dist/lodash.js',
        'app/lib/jquery/dist/jquery.js',
        'app/lib/angular/angular.js',
        'app/lib/d3/d3.js',
        'app/lib/leaflet/dist/leaflet-src.js',
        'app/lib/angular-route/angular-route.js',
        'app/lib/angular-ui-bootstrap-bower/ui-bootstrap-tpls.js',
        'app/lib/angular-loading-bar/build/loading-bar.js',
        'app/lib/angular-leaflet-directive/dist/angular-leaflet-directive.js',
        'app/lib/bootstrap-tour/build/js/bootstrap-tour-standalone.js'
    ],
    less: 'app/less/master.less',
    index: 'app/index.ejs',
    watch: 'app/**/*'
};

gulp.task('js', function() {
    return gulp.src(files.js)
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/'))
    ;
});

gulp.task('jsLib', function() {
    return gulp.src(files.jsLib)
        .pipe(concat('lib.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/build/'))
    ;
});

gulp.task('less', function() {
    return gulp.src(files.less)
        .pipe(less({
            compress: true
        }))
        .pipe(rename('master.min.css'))
        .pipe(gulp.dest('app/build/'))
    ;
});

var webPathJsFiles = [];
gulp.task('listJsFiles', function() {
    var basePath = __dirname + '/app';
    return gulp.src([].concat(files.jsLib, files.js))
        .pipe(tap(function(file) {
            if (file.path.indexOf(basePath) === 0) {
                var webPath = file.path.slice(basePath.length);
                webPathJsFiles.push(webPath);
            }
        }))
    ;
});

gulp.task('index', ['listJsFiles'], function() {
    return gulp.src(files.index)
        .pipe(ejs({
            jsFiles: webPathJsFiles
        }))
        .pipe(gulp.dest('app/'))
    ;
});



gulp.task('default', ['js', 'jsLib', 'less', 'index']);
