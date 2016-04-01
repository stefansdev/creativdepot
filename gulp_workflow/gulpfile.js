var gulp          = require('gulp'),
browserSync     = require('browser-sync'),
reload          = browserSync.reload,
sass            = require('gulp-sass'),
autoprefixer    = require('gulp-autoprefixer'),
rename          = require('gulp-rename'),
plumber         = require('gulp-plumber'),
cssnano         = require('gulp-cssnano'),
concat          = require('gulp-concat'),
uglify          = require('gulp-uglify');
livereload      = require('gulp-livereload'),
imagemin        = require('gulp-imagemin'),
svgSprite       = require('gulp-svg-sprite'),
svgmin      	  = require('gulp-svgmin'),
svgstore        = require('gulp-svgstore'),
gzip            = require('gulp-gzip')
cheerio         = require('gulp-cheerio')
config          = require('./gulpconfig.json')
;

// error function for plumber
var onError = function (err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};
//Srediti SVG task!
// gulp.task('svg',function(){
// 	gulp.src(config.sourcePath.svg)
// 	.pipe(plumber())
// )};

gulp.task('styles', function() {
    gulp.src(config.sourcePaths.scss)
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer(config.autoprefixerBrowsers))
    .pipe(cssnano())
    //.pipe(gzip(config.gzip_options))
    .pipe(concat(config.deployFiles.scss))
    .pipe(gulp.dest(config.deployPaths.scss))
    .pipe(reload({stream:true}))
    ;
});

gulp.task('js', function() {
    gulp.src(config.sourcePaths.js)
    .pipe(uglify())
    .pipe(plumber())
    .pipe(concat(config.deployFiles.js))
    .pipe(gulp.dest(config.deployPaths.js))
    ;
});

gulp.task('svgstore', function () {
    return gulp
    .src(config.sourcePaths.svg)
    .pipe(svgmin({
        plugins: [{
            cleanupIDs: {
                pretty: true,
                minify: true
            }
        }]
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(cheerio({
        run: function ($) {
            $('svg').attr('style',  'display:none');
            $('[fill]').removeAttr('fill');
        },
        parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(config.deployPaths.svg));
});

gulp.task('browser-sync', function() {
    browserSync({
        proxy: config.proxy
    });
})

gulp.task('reload-page', function(){
    browserSync.reload();
})

gulp.task('watch', ['browser-sync'], function () {
    gulp.watch(config.sourcePaths.js, ['js', 'reload-page']);
    gulp.watch(config.sourcePaths.php, ['reload-page']);
    gulp.watch(config.sourcePaths.scss, ['styles']);
    // gulp.watch(config.sourcePaths.svg, ['svgstore', 'reload-page']);
});
