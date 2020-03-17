const gulp = require("gulp");

const scss = require("gulp-sass");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");

gulp.task("scssAll", function(){
    return gulp.src("scss/*.scss")
    .pipe(scss())
    .pipe(gulp.dest("css"))
})

gulp.task("scss", function(){
    return gulp.src("scss/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(connect.reload());
})

gulp.task("scssRegister", function(){
    return gulp.src("scss/register.scss")
    .pipe(scss())
    .pipe(gulp.dest("css"))
    .pipe(minifyCSS())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("css"))
    .pipe(connect.reload());
})

gulp.task("copy-html", function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("html/"))
    .pipe(connect.reload());
})

gulp.task("images", function(){
    return gulp.src("img/**/*")
    .pipe(gulp.dest("images/"))
    .pipe(connect.reload());
})

gulp.task("script",function(){
    return gulp.src("[*.js","!gulpfile.js]")
    .pipe(gulp.dest("js"))
    .pipe(connect.reload());
})

gulp.task("watch", function(){
    gulp.watch("*.html", ["copy-html"]);
    gulp.watch("img/**/*", ["images"]);
    // gulp.watch(["xml/*.xml", "json/*.json", "!json/4.json"], ["data"]);
    gulp.watch("scss/index.scss", ["scss"]);
    gulp.watch("scss/register.scss", ["scssRegister"]);
    // gulp.watch(["*.js"], ['scripts']);
})

const connect = require("gulp-connect");
gulp.task("server", function(){
    connect.server({
        root: "project",   //指定服务器的根目录
        port: 8888,
        livereload: true //启动实时刷新
    })
})

gulp.task("default", ["server","watch"]);