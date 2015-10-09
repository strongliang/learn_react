var gulp = require('gulp');
var connect = require('gulp-connect');  // runs a local dev server
var open = require('gulp-open');  // open a url in a web browser


var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: './src/*html',
        css: './src/*css',
        js: './src/*js',
        dist: './dist'
    }
}

//start a local dev server
gulp.task('connect', function() {
    connect.server({
        root:['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload:true
    });
})


gulp.task('open', ['connect'], function() {
    gulp.src('dist/index.html')
        .pipe(open({ uri: config.devBaseUrl + ':' + config.port + '/'}));
});


gulp.task('html', function() {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('css', function() {
    gulp.src(config.paths.css)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src(config.paths.js)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('default', ['html', 'js', 'css', 'open']);

