var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var ejs = require('gulp-ejs');
var auto = require('gulp-autoprefixer');
var watch = require('gulp-watch');

gulp.task('sass',function(){
    gulp.src('scss/**/*.scss').pipe(sass({outputStyle:'expanded'})).pipe(gulp.dest('build/css'));
})

gulp.task('auto',function(){
    gulp.src('build/css/**/*.css').pipe(auto()).pipe(gulp.dest('build/css/auto'));
})

gulp.task('default',function(){
    gulp.watch('scss/**/*scss',['sass']);
})
