const {
    watch,
    parallel,
    series
} = require('gulp');

module.exports = function watching() {
    watch('*.php', parallel('php'));
    watch('src/*.html', parallel('html'));
    watch('src/scss/*.scss', parallel('style'));
    watch('src/js/*.js', parallel('dev_js'));
}