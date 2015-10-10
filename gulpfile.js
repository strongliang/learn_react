
var gulp = require('gulp');
var connect = require('gulp-connect');  // runs a local dev server
var open = require('gulp-open');  // open a url in a web browser
var watch = require('gulp-watch');
var browserify = require('browserify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var concat = require('gulp-concat'); //concatenates files
var lint = require('gulp-eslint');

var config = {
    port: 9005,
    devBaseUrl: 'http://localhost',
    paths: {
        html: 'src/*html',
        css: [
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
            'src/*css'
        ],
        js: 'src/**/*js',
        indexJs: 'src/index.js',
        dist: 'dist'
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
        .pipe(concat('bundle.css'))
        .on('error', console.error.bind(console))  // bind error to the console object?
        .pipe(gulp.dest(config.paths.dist + '/css'))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    browserify(config.paths.indexJs)  // TODO: how does this work? not all js?
    // browserify(config.paths.js)  // TODO: how does this work? not all js?
        .transform(reactify)
        .bundle()  // put everything in one js
        .on('error', console.error.bind(console))  // bind error to the console object?
        .pipe(source('bundle.js'))  // give the bundle a name
        .pipe(gulp.dest(config.paths.dist + '/scripts'))
        .pipe(connect.reload());
});

gulp.task('lint', function() {
    return gulp.src(config.paths.js)
        .pipe(lint())
        .pipe(lint({config: 'eslint.config.json'}))
        .pipe(lint.format());
});

gulp.task('watch', function() {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch(config.paths.css, ['css']);
    watch(['dist/**']).pipe(connect.reload());
});

// include css and js here so that they get loaded the first time
gulp.task('default', ['html', 'css', 'js', 'lint', 'open', 'watch']);  // seems that open before watch is better
