//'use strict';


/////////////////////////////////////
//Gulp Required Setup
////////////////////////////////////
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');


///////////////////////////////////
//Scripts Task
///////////////////////////////////
gulp.task('scripts', function(){
    gulp.src(['app/js/**/*.js', '!app/js/**/*.min.js'])
       .pipe(rename({suffix:'.min'}))
       .pipe(plumber())
       .pipe(uglify())
       .pipe(gulp.dest('app/js'))
       .pipe(reload({ stream:true }));
});


///////////////////////////////////
//Scss Task
///////////////////////////////////
gulp.task('sass', function(){
   gulp.src('app/sass/**/*.scss')
       .pipe(plumber()) 
       .pipe(sass())
       .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
       .pipe(gulp.dest('app/css/'))
       .pipe(reload({ stream:true }));

});



//////////////////////////////
// HTML task
//////////////////////////////

gulp.task('html', function () {
        gulp.src('app/**/*.html')
        .pipe(reload({ stream:true }));
});



//////////////////////////////
// Browser-sync
//////////////////////////////

gulp.task('browser-sync', function(){
    browserSync({
        server:{
            baseDir: './app/'
        }
    });
});



///////////////////////////////////
//Watch Task
///////////////////////////////////
gulp.task('watch', function(){
    gulp.watch('app/js/**/*.js', ['scripts'])
    gulp.watch('app/sass/**/*.scss', ['sass'])
    gulp.watch('app/**/*.html', ['html']);

});



///////////////////////////////////
//Default Task
///////////////////////////////////
gulp.task('default', ['scripts', 'sass','html' ,'browser-sync', 'watch']);