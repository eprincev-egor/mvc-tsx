"use strict";

const {src, dest, series} = require("gulp");
const clean = require("gulp-clean");
const webpackStream = require("webpack-stream");

const webpackConfig = {
    onlyMvc: {
        full: require("./webpack/only-mvc.full.config"),
        min: require("./webpack/only-mvc.min.config")
    },
    mvcWithDeps: {
        min: require("./webpack/mvc-and-deps.min.config"),
        full: require("./webpack/mvc-and-deps.full.config")
    }
};

const paths = {
    dest: "./bundle"
};


// remove bundles/*
function clearBundles() {
    return src(paths.dest, {
        read: false,
        allowEmpty: true
    })
        .pipe(clean());
}

function build_only_mvc_min() {
    return src("./lib/index.ts")
        .pipe( webpackStream(webpackConfig.onlyMvc.min) )
        .pipe( dest(paths.dest) );
}

function build_only_mvc_full() {
    return src("./lib/index.ts")
        .pipe( webpackStream(webpackConfig.onlyMvc.full) )
        .pipe( dest(paths.dest) );
}

function build_mvc_with_deps_min() {
    return src("./lib/index.ts")
        .pipe( webpackStream(webpackConfig.mvcWithDeps.min) )
        .pipe( dest(paths.dest) );
}

exports.build = series(
    clearBundles,
    build_only_mvc_min,
    build_only_mvc_full,
    build_mvc_with_deps_min
);
