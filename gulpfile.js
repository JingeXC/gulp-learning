var gulp = require("gulp");
// var rename = require("gulp-rename");
// var less = require("gulp-less");
// var sass = require("gulp-sass");
// var styl = require("gulp-stylus");
// var connect = require("gulp-connect");
// var livereload = require('gulp-livereload');

var gulpJade = require("gulp-jade");
var jade = require("jade");
var source = require("vinyl-source-stream");
var browserify = require("browserify");
var watchify = require("watchify");
var tsify = require("tsify");

// var uglify = require('gulp-uglify-cli');//压缩js
// var imgmin = require('gulp-imagemin');//压缩图片
// var cssmin = require('gulp-cssmin');//压缩css
// var htmlmin = require('gulp-htmlmin');//压缩html
// var processhtml = require('gulp-processhtml');//修改html中引入的文件名
var $ = require('gulp-load-plugins')();

var fs = require("fs");
var json = JSON.parse(fs.readFileSync('./package.json'));
var cssstyle = json.css;

if(cssstyle!=='styl' && cssstyle!=='less' && cssstyle!=='sass' && cssstyle!=='css'){
	cssstyle = 'css';
	console.log("请检查是否使用前端预处理工具");
}
//重写图片文件名
gulp.task('rename',function(){
	var i=1;
	gulp.src('./RAW/*.jpg')
	.pipe($.rename(function(path){
		path.basename = i++;
	}))
	.pipe(gulp.dest('./images'));
})

//-------------创建项目骨架
//创建文件目录
gulp.task('mkdir',function(){
	fs.readdir('.',function(err,files){
		let hasFloder = false;
		let folderArry = ['app','app/css','app/js','app/images'];
		for(let folder of files){
			if(folder==='app'){
				hasFloder=true;
				console.log('You have been build folder');
			}
		}
		if(!hasFloder){
			(function(array){
				for(fold of array){
					fs.mkdir(fold,function(err){
						console.log(err);
					})
				}
			})(folderArry);
		}
	})
});
//加载模板文件
//加载html
gulp.task('addHtml',function(){
	gulp.src('./lib/*.jade')
	.pipe(gulpJade({
		jade:jade,
		pretty:true
	})).
	pipe(gulp.dest('./app/'));
})
//-------------开发环境
//html
gulp.task('html', function () {
  gulp.src('./app/*.html')
    .pipe($.livereload());
});
//css
gulp.task('styl',function(){
	gulp.src('./app/css/*.styl')
	.pipe($.stylus())
	.pipe(gulp.dest('./app/css'));
})
gulp.task('less',function(){
	gulp.src('./app/css/*.less')
	.pipe($.less())
	.pipe(gulp.dest('./app/css'));
})
gulp.task('sass',function(){
	gulp.src('./app/css/*.sass')
	.pipe($.sass())
	.pipe(gulp.dest('./app/css'));
})
gulp.task('css',function(){
	gulp.src('./app/css/*.css')
	.pipe($.livereload());
})
//typescript
gulp.task('tswork',function(){
	return browserify({
		basedir:'./app',
		debug:true,
		entries:['js/main.ts'],
		cache:{},
		packageCache:{}
	})
	.plugin(tsify)
	.bundle()
	.pipe(source('bundle.js'))
	.pipe(gulp.dest('./app/js'));
})

//javascript
gulp.task('js',function(){
	gulp.src('./app/js/*.js')
	.pipe($.livereload());
})
//server
gulp.task('server',function(){
	$.connect.server({
		root:'./app',
		livereload:true,
		port:8320
	})
})
//watch
gulp.task('watch',function(){
	gulp.watch(['./app/*.html'],['html']);
	gulp.watch(['./app/css/*.'+cssstyle],[cssstyle]);
	gulp.watch(['./app/css/*.css'],['css']);
	gulp.watch(['./app/js/*.ts'],['tswork']);
	gulp.watch(['./app/js/*.js'],['js']);
	$.livereload.listen();
})



//---------打包状态

//压缩js文件
gulp.task('minifyjs',function(){
	gulp.src('./app/js/*js')
	.pipe($.uglify())
	.pipe($.rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/js'));
});
//压缩图片
gulp.task('imgmin',function(){
	gulp.src('./app/images/*')
	.pipe($.imagemin())
	.pipe(gulp.dest('dist/images'));
})
//压缩Css
gulp.task('cssmin',function(){
	gulp.src('./app/css/*.css')
	.pipe($.cssmin())
	.pipe($.rename({suffix:'.min'}))
	.pipe(gulp.dest('dist/css'));
})
//压缩html,修改html引入文件名
gulp.task('htmlmin',function(){
	gulp.src('./app/*.html')
	.pipe($.processhtml())
	.pipe($.htmlmin({collapseWhitespace:true}))
	.pipe(gulp.dest('dist'));
})

gulp.task('start',['mkdir']);
gulp.task('serve',['server','watch',cssstyle,'tswork']);
gulp.task('build',['minifyjs','imgmin','cssmin','htmlmin']);
