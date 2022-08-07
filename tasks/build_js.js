const {
	src,
	dest
} = require('gulp');
const uglify = require('gulp-uglify-es').default;
const babel = require('gulp-babel');
const concat = require('gulp-concat');

module.exports = function build_js() {
	return src(['src/js/*.js', 'src/js/main.js'])
		.pipe(uglify())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(concat('s-cl.module.min.js'))
		.pipe(dest('dist/js/'))
}