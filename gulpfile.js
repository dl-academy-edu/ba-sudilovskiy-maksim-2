let final_folder = 'build',
    src_folder = '#src';

let path = {
  build: {
    html: final_folder + '/',
    css: final_folder + '/css/',
    js: final_folder + '/js/',
    img: final_folder + '/img/',
    fonts: final_folder + '/fonts/',
    media: final_folder + '/media/',
  },
  src: {
    html: [src_folder + '/**/*.html', '!' + src_folder + '/**/_*.html'],
    css: src_folder + '/scss/*.scss',
    js: [src_folder + '/js/**/*.js', '!' + src_folder + '/**/_*.js'],
    img: src_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: src_folder + '/fonts/*.ttf',
    media: src_folder + '/media/*.mp3',
  },
  watch: {
    html: src_folder + '/**/*.html',
    css: src_folder + '/scss/**/*.scss',
    js: src_folder + '/js/**/*.js',
    img: src_folder + '/img/*.{jpg,png,svg,gif,ico,webp}',
    fonts: src_folder + '/fonts/*.ttf',
  },
  clean: './' + final_folder + '/*',
};

let { src, dest } = require('gulp'),
  gulp = require('gulp'),
  browsersync = require('browser-sync').create(),
  fileinclude = require('gulp-file-include'),
  del = require('del'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  group_media = require('gulp-group-css-media-queries'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel'),
  imagemin = require('gulp-imagemin'),
  imageminPngquant = require('imagemin-pngquant'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  svgSprite = require('gulp-svg-sprite');



function browserSync () {
    browsersync.init({
      server: {
        baseDir: './' + final_folder + '/'
      },
      notify: false
    })
}

function html () {
  return src(path.src.html)
    .pipe(fileinclude())
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(
      sass({
        outputStyle: 'expanded',
      })
    )
    .pipe(group_media())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['Last 5 versions'],
        cascade: false,
      })
    )
    .pipe(dest(path.build.css))
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(
      rename({
        extname: '.min.css'
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(dest(path.build.js))
    .pipe(
      babel({
        presets: ['@babel/env'],
      })
    )
    .pipe(uglify())
    .pipe(
      rename({
        extname: '.min.js',
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(dest(path.build.img))
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 70 }),
        imagemin.svgo(),
        imageminPngquant({ quality: [0.8, 0.9] })
      ])
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream());
}

function fonts () {
  src(path.src.fonts)
    .pipe(ttf2woff())
    .pipe(dest(path.build.fonts))
  return src(path.src.fonts)
    .pipe(ttf2woff2())
    .pipe(dest(path.build.fonts))
}

function svgSpriteMono() {
  return gulp
    .src([src_folder + '/img/icons/mono_svg/*.svg'])
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite_mono.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name'],
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(dest(path.build.img));
}

function svgSpriteMulti () {
  return gulp.src([src_folder + '/img/icons/multi_svg/*.svg'])
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: '../sprite_multi.svg',
          },
        },
        shape: {
          transform: [
            {
              svgo: {
                plugins: [
                  {
                    removeAttrs: {
                      attrs: ['class', 'data-name', 'fill'],
                    },
                  },
                ],
              },
            },
          ],
        },
      })
    )
    .pipe(dest(path.build.img))
}

function media () {
  return src(path.src.media)
    .pipe(dest(path.build.media))
}



function watchFiles () {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)
}

function clean () {
  return del(path.clean)
}

let createSpriteSvg = gulp.parallel(svgSpriteMono, svgSpriteMulti);
let build = gulp.series(clean, gulp.parallel(media, images, createSpriteSvg, fonts, js, css, html))
let watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));


exports.media = media;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

gulp.task('svg', createSpriteSvg);
gulp.task('build', build);
gulp.task('start', watch);
