'use strict';
import { src, dest, watch, series, parallel } from 'gulp';
import yargs from 'yargs';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);
import cleanCss from 'gulp-clean-css';
import gulpif from 'gulp-if';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import image from 'gulp-imagemin';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import plumber from 'gulp-plumber';
import del from 'del';
import browserSync from "browser-sync";
import svgstore from 'gulp-svgstore';
import cheerio from 'gulp-cheerio';
import tailwindcss from "tailwindcss";
import autoprefixer from 'autoprefixer';
import postScss from 'postcss-scss'
import config from "./gulpconfig.json";

const PRODUCTION = yargs.argv.prod;
const server = browserSync.create();
export const serve = done => {
	server.init({
		proxy: config.proxy
	});
	done();
};
export const reload = done => {
	server.reload();
	done();
};
export const clean = () => del(config.cleanFiles);
export const cleanDevCss = () => del(config.cleanCSS);

export const styles = () => {
	var plugins = [
		tailwindcss(config.tailwindjs),
		autoprefixer()
	];
	return src(config.sourcePaths.scss, config.sourcePaths.tailwind)
		.pipe(gulpif(!PRODUCTION, sourcemaps.init()))
		.pipe(sass()).on('error', sass.logError)
		.pipe(postcss(plugins, { parser: postScss }))
		.pipe(gulpif(PRODUCTION, cleanCss({ compatibility: 'ie8' })))
		.pipe((concat({ path: "app.css" })))
		.pipe(gulpif(!PRODUCTION, sourcemaps.write()))
		.pipe(dest(config.deployPaths.scss))
		.pipe(server.stream());
}


export const images = () => {
	return src(config.sourcePaths.images)
		.pipe(image())
		.pipe(dest(config.deployPaths.images));
}



export const svg = () => {
	return src(config.sourcePaths.svg)
		.pipe(svgstore({
			inlineSvg: true
		}))
		.pipe(cheerio({
			run: function ($) {
				$('svg').attr('style', 'display:none');
			},
			parserOptions: {
				xmlMode: true
			}
		}))
		.pipe(dest(config.deployPaths.svg));
}

export const scripts = () => {
	return src(config.sourcePaths.js)
		.pipe(uglify())
		.pipe(plumber())
		.pipe(concat(config.deployFiles.js))
		.pipe(dest(config.deployPaths.js));
}

export const watchForChanges = () => {
	watch(config.sourcePaths.scss, series(styles));
	watch(config.sourcePaths.tailwind, series(styles));
	watch(config.tailwindjs, series(styles));
	watch(config.sourcePaths.images, series(images, reload));
	watch(config.sourcePaths.js, series(scripts, reload));
	watch(config.sourcePaths.svg, svg);
	watch(config.sourcePaths.php, series(styles, reload));
}
export const dev = series(clean, parallel(styles, images, svg, scripts), serve, watchForChanges);
export const build = series(clean, parallel(styles, images, svg, scripts));
export default dev;
