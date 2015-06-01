var gulp = require("gulp");
var path = require("path");
var gutil = require("gulp-util");
var watch = require("gulp-watch");
var sass = require("gulp-sass");
// var rename = require("gulp-rename");
var minifycss = require("gulp-minify-css");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");


gulp.task('sass', function(){
	return gulp.src('app/sass/*.scss')
		.pipe(minifycss())
		.pipe(gulp.dest('build/css'));
});


gulp.task('html', function() {
  gulp.src("app/*.html")
    .pipe(gulp.dest('build'));
});

gulp.task("default", ["webpack-dev-server", "build", "watch"]);

gulp.task("build", function(callback) {
	gulp.run["webpack:build-dev", "html", "sass"];
  return callback();
});

gulp.task('watch', function() {

  //Add watching on sass-files
  gulp.watch('app/sass/*.scss', ["sass"]);

  //Add watching on html-files
  gulp.watch('app/*.html', function () {
    gulp.run('html');
  });

  // gulp.watch('app/js/*.js', function () {
  //   gulp.run("webpack:build-dev")
  // });
  var src = './app';
  var dest = './build';

  gulp.watch(path.join(src, 'app/js/*.js')).on('change', function(event) {
    if (event.type === 'changed') {
      gulp.src(event.path, { base: path.resolve(src) })
        .pipe(webpack.closest("webpack.config.js"))
        .pipe(webpack.init(webpackConfig))
        .pipe(webpack.props(webpackOptions))
        .pipe(webpack.watch(function(err, stats) {
          gulp.src(this.path, { base: this.base })
              .pipe(webpack.proxy(err, stats))
              .pipe(webpack.format({
                  verbose: true,
                  version: false
              }))
              .pipe(gulp.dest(dest));
          }));
    }
  });

});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});
gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;

	// Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
    contentBase: __dirname + "/build",
    hot: true,
		publicPath: myConfig.output.publicPath,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});
