/*——————————————————————————————————————————————————————————
 /  Plugins
 ——————————————————————————————————————————————————————————*/

var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var combineMq = require('gulp-combine-mq');

/*——————————————————————————————————————————————————————————
 /  Commands
 ——————————————————————————————————————————————————————————*/

/**
 * @summary Build Styles.
 *
 * Compiles the main SCSS file at /css/pre/styles.css. This
 * file imports the Foundation styles and settings, so all
 * configuration and imports are run through this one file.
 *
 * Runs on gulp 'build-styles', 'automate', and 'browser-sync'
 *
 * @since 0.1.0
 */
gulp.task('build-styles', function() {

    gulp.src(['./typography.scss'])
        .pipe(sass({outputStyle: 'nested'}).on('error', sass.logError))
        .pipe(combineMq({
            beautify: false
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());

});

/**
 * @summary Browser Sync.
 *
 * Watches for changes in the theme CSS & JS directories,
 * and compiles styles and scripts based on what changed.
 *
 * Runs on gulp 'automate' and 'browser-sync'
 *
 * @since 0.1.0
 *
 * @param proxy The local site domain.
 */
gulp.task('watch', function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch(['*.scss'], ['build-styles']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
