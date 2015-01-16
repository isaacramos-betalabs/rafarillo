/*******************************************************************************
    DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp');                             // gulp core
    sass = require('gulp-sass'),                        // sass compiler
    minifycss = require('gulp-minify-css'),             // minify the css files
    uglify = require('gulp-uglify'),                    // uglifies the js
    jshint = require('gulp-jshint'),                    // check if js is ok
    concat = require('gulp-concat'),                    // concatinate js
    stylish = require('jshint-stylish'),                // make errors look good in shell
    rename = require("gulp-rename");                    // rename files
    notify = require('gulp-notify'),                    // send notifications to osx
    plumber = require('gulp-plumber'),                  // disable interuption
    browserSync = require('browser-sync');              // inject code to all devices


/*******************************************************************************
    FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/

var target = {
    sass_src : 'assets/scss/main.scss',                 // all sass files
    css_dest : 'build/css',                             // where to put minified js

    js_lint_src : [                                     // all js that should be linted
        'assets/js/main.js',
    ],
    js_concat_src : [                                   // all js files that should be concatinated
        'asstes/js/main.js',
        'vendor/js/**/*.js'
    ],
    js_uglify_src : [                                   // all js files that should be uglified
        'build/js/main.js'
    ],
    js_dest : 'build/js'
};


/*******************************************************************************
    SASS TASK
*******************************************************************************/

gulp.task('sass', function() {
    gulp.src(target.sass_src)                           // get the files
        .pipe(plumber())                                // make sure gulp keeps running on errors
        .pipe(sass())                                   // compile all sass
        .pipe(minifycss())                              // minify css
        .pipe(rename({                                  // give the files a min suffix
            suffix: '.min'
        }))
        .pipe(gulp.dest(target.css_dest))               // where to put the file
        .pipe(notify({message: 'SCSS processed!'}));    // notify when done
});

/*******************************************************************************
4. JS TASKS
*******************************************************************************/

// lint my custom js
gulp.task('js-lint', function() {
    gulp.src(target.js_lint_src)                        // get the files
        .pipe(jshint())                                 // lint the files
        .pipe(jshint.reporter(stylish))                 // present the results in a beautiful way
});

// minify & concatinate all other js
gulp.task('js-concat', function() {
    gulp.src(target.js_concat_src)                      // get the files
        .pipe(concat('main.js'))                        // concatinate to one file
        .pipe(gulp.dest(target.js_dest))                // where to put the files
        .pipe(notify({message: 'JS processed!'}));      // notify when done
});

// minify all js files that should not be concatinated
gulp.task('js-uglify', function() {
    gulp.src(target.js_uglify_src)                      // get the files
        .pipe(uglify())                                 // uglify the files
        .pipe(rename({                                  // give the files a min suffix
            suffix: '.min'
        }))
        .pipe(gulp.dest(target.js_dest))                // where to put the files
        .pipe(notify({ message: 'JS processed!'}));     // notify when done
});

/*******************************************************************************
    BROWSER SYNC
*******************************************************************************/

gulp.task('browser-sync', function() {
    browserSync.init(['css/*.css', 'js/*.js'], {        // files to inject
        server: {
            baseDir: './'
        }
    });
});


/*******************************************************************************
    GULP TASKS
*******************************************************************************/

gulp.task('default', function() {
    gulp.run('sass', 'js-lint', 'js-concat', 'js-uglify', 'browser-sync');
    gulp.watch('assets/scss/**/*.scss', function() {
        gulp.run('sass');
    });

    gulp.watch('assets/js/**/*.js', function() {
        gulp.run('sass');
    });
});