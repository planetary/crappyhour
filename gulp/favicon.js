const CONFIG = {
    paths: [
        'assets/favicon/favicon.png'
    ]
};

const path = require('path');

module.exports = function(gulp, plugins) {
    gulp.task(
        'build:favicon',
        'converts the source image into a number of different formats and sizes, then places ' +
        'them in the build folder.',
        function() {
            return gulp.src(CONFIG.paths)
                .pipe(plugins.newer(path.join(gulp.outputPath, 'favicon.ico')))
                .pipe(plugins.favicons({}))
                .pipe(gulp.dest(gulp.outputPath))
                .pipe(plugins.notify({message: 'Favicon created', onLast: true}));
        }
    );

    gulp.task(
        'watch:favicon',
        'watches the favicon folder for new files, converts icon to a number of formats and ' +
        'places them in the build folder.',
        ['build:favicon'],
        function() {
            return gulp.watch(CONFIG.paths, ['build:favicon']);
        }
    );
};
