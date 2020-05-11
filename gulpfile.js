const { series, src, dest, watch } = require('gulp');
const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgo = require('gulp-svgo');

const config = require('./config');
const svgConfig = {
    mode: {
        symbol: {
            inline: true,
            dest: '',
            sprite: 'sprite.svg',
        },
    },
};

function fonts() {
    return src('**/*', { cwd: 'assets/fonts' }).pipe(dest('public/dist/fonts'));
}

function icons() {
    return src('**/*.svg', { cwd: 'assets/icons' })
        .pipe(svgSprite(svgConfig))
        .pipe(dest('public/dist/icons'));
}

function images() {
    return src('assets/images/*')
      .pipe(imagemin())
      .pipe(dest('public/dist/images'))
}

function svg() {
    return src('assets/svg/*')
        .pipe(svgo({
            plugins: [{
              cleanupAttrs: true,
            }, {
              removeDoctype: true,
            },{
              removeXMLProcInst: true,
            },{
              removeComments: true,
            },{
              removeMetadata: true,
            },{
              removeTitle: true,
            },{
              removeDesc: true,
            },{
              removeUselessDefs: true,
            },{
              removeEditorsNSData: true,
            },{
              removeEmptyAttrs: true,
            },{
              removeHiddenElems: true,
            },{
              removeEmptyText: true,
            },{
              removeEmptyContainers: true,
            },{
              removeViewBox: false,
            },{
              cleanupEnableBackground: true,
            },{
              convertStyleToAttrs: true,
            },{
              convertColors: true,
            },{
              convertPathData: true,
            },{
              convertTransform: true,
            },{
              removeUnknownsAndDefaults: true,
            },{
              removeNonInheritableGroupAttrs: true,
            },{
              removeUselessStrokeAndFill: true,
            },{
              removeUnusedNS: true,
            },{
              cleanupIDs: true,
            },{
              cleanupNumericValues: true,
            },{
              moveElemsAttrsToGroup: true,
            },{
              moveGroupAttrsToElems: true,
            },{
              collapseGroups: true,
            },{
              removeRasterImages: false,
            },{
              mergePaths: true,
            },{
              convertShapeToPath: true,
            },{
              sortAttrs: true,
            },{
              removeDimensions: true,
            },{
              removeAttrs: {attrs: '(stroke|fill)'},
            }]
          }))
        .pipe(dest('public/dist/svg'));
}

exports.fonts = fonts;
exports.icons = icons;
exports.images = images;
exports.svg = svg;
exports.watch = function () {
    watch('assets/fonts/**', fonts);
    watch('assets/icons/**', icons);
    watch('assets/images/**', images);
};
exports.default = series(images, svg, icons);
