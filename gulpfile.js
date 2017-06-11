var gulp =  require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var sass=require("gulp-sass");
var css = require("gulp-minify-css");
var html=require("gulp-htmlmin");
var imgmin=require("gulp-imagemin");
var jpegtran=require("imagemin-jpegtran");
var webserver=require("gulp-webserver");

gulp.task("jsmin",function(){
	gulp.src("src/js/*.js")
		.pipe(concat("main.js"))    	//合并
		.pipe(uglify())					//压缩
		.pipe(gulp.dest("bound/js/"))	//复制
})

/*gulp.task("cssmin",function(){
	gulp.src("src/css/*.css")
		.pipe(concat("main.css"))  
		.pipe(css())					
		.pipe(gulp.dest("bound/css/"))	
})*/

gulp.task("cssmin",function(){
	gulp.src("src/css/*.sass") 
		.pipe(sass())	
		.pipe(css())				
		.pipe(gulp.dest("bound/css/"))	
})

gulp.task("htmlmin",function(){
	gulp.src("src/html/*.html")
		.pipe(concat("main.html")) 
		.pipe(html({collapseWhitespace:true}))
		.pipe(gulp.dest("bound/html/"))	
})

gulp.task("imgmin",function(){
	gulp.src("src/images/*.jpeg")
		.pipe(imgmin([
				imgmin.jpegtran({progressive:true})
			]))
		.pipe(gulp.dest("bound/images/"))
})

/*gulp.task("boundjs",function(){
	gulp.src("src/html/*.html")
		.pipe(concat("main.html")) 
		.pipe(html({collapseWhitespace:true}))
		.pipe(gulp.dest("src/jss/"))	
})*/

/*gulp.task('server',function(){
	gulp.src('bound')
		.pipe(webserver({
			livereload:true,
			directoryListing:true,
			open:true
		}))
}*/

gulp.task('server',["jsmin","cssmin","htmlmin"], function() {
  gulp.src('./bound')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: "/html/"
    }));
});
