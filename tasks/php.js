const {
	src,
	dest
} = require('gulp');
const bs = require('browser-sync');

module.exports = function php() {
	return src('calc.php')
		.pipe(dest('dist'))
		.pipe(bs.stream())
}