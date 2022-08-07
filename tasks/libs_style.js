const plugins = [];

const {
	src,
	dest
} = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const map = require('gulp-sourcemaps');

module.exports = function libs_style(done) {
	if (plugins.length > 0) {
		return src(plugins)
			.pipe(map.init())
			.pipe(sass({
				outputStyle: 'compressed'
			}).on('error', sass.logError))
			.pipe(concat('libs.min.css'))
			.pipe(map.write('../sourcemaps/'))
			.pipe(dest('dist/css/'))
	} else {
		return done(console.log('No added CSS/SCSS plugins'));
	}
}