const { watch, src, dest, series } = require(`gulp`);
const browserSync = require(`browser-sync`);
const htmlValidator = require(`gulp-html`);
const cssLinter = require(`gulp-stylelint`);
const jsLinter = require(`gulp-eslint`);
const babel = require(`gulp-babel`);
const htmlCompressor = require(`gulp-htmlmin`);
const cleanCSS = require('gulp-clean-css');
const jsCompressor = require(`gulp-uglify`);

const reload = browserSync.reload;

// Validator
let validateHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlValidator());
};

//css validator
let lintCSS = () => {
    return src(`css/*.css`)
        .pipe(cssLinter({
            failAfterError: true,
            reporters: [
                {formatter: `verbose`, console: true}
            ]
        }))
        .pipe(dest(`temp/css`));
};

//Js Validator
let lintJS = () => {
    return src(`js/*.js`)
        .pipe(jsLinter())
        .pipe(jsLinter.formatEach(`compact`, process.stderr));
};

// babel
let devCompressJS = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(dest(`temp/js`));
};

let prodCompressJS = () => {
    return src(`js/*.js`)
        .pipe(babel())
        .pipe(jsCompressor())
        .pipe(dest(`prod/js`));
};

let compressHTML = () => {
    return src(`html/*.html`)
        .pipe(htmlCompressor({collapseWhitespace: true}))
        .pipe(dest(`prod`));
};

let minifyCSS = () => {
    return src('css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest('prod/css'));
};

//Server for developer environment
let serve = () => {
    browserSync({
        reloadDelay: 3000,
        server: {
            baseDir: [
                `html`,
                `temp`
            ]
        }
    });

    watch([
        `html/*.html`,
        `css/*.css`,
        `js/**/*.js`
        ],
        series(validateHTML, lintCSS, lintJS, devCompressJS)
    ).on(`change`, reload);
};

exports.dev = series( validateHTML, lintCSS, lintJS, devCompressJS, serve );
exports.build = series(prodCompressJS, compressHTML, minifyCSS);
