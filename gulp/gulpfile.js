"use strict";

const {src, dest, series, watch} = require("gulp");
const clean = require("gulp-clean");
const webpackStream = require("webpack-stream");
const named = require("vinyl-named");

const webpackConfig = {
    examples: require("../examples/webpack.config"),
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
    src: "./lib/index.ts",
    dest: "./bundle",
    examples: {
        src: "./examples/**/index.tsx",
        dest: "./examples"
    }
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
    return src( paths.src )
        .pipe( webpackStream(webpackConfig.onlyMvc.min) )
        .pipe( dest(paths.dest) );
}

function build_only_mvc_full() {
    return src( paths.src )
        .pipe( webpackStream(webpackConfig.onlyMvc.full) )
        .pipe( dest(paths.dest) );
}

function build_mvc_with_deps_min() {
    return src( paths.src )
        .pipe( webpackStream(webpackConfig.mvcWithDeps.min) )
        .pipe( dest(paths.dest) );
}

function build_mvc_with_deps_full() {
    return src( paths.src )
        .pipe( webpackStream(webpackConfig.mvcWithDeps.full) )
        .pipe( dest(paths.dest) );
}

function build_examples() {
    return src( paths.examples.src )
        .pipe( named((entryFile) => getExampleBundleName(entryFile)) )
        .pipe( webpackStream(webpackConfig.examples) )
        .pipe( dest(paths.examples.dest) );
}

function getExampleBundleName(entryIndexFile) {
    const absolutePathToIndex = entryIndexFile.path;
    const pathParts = absolutePathToIndex.split(/[\\/]/);
    const exampleDirName = pathParts.slice(-2)[0];
    return exampleDirName;
}

exports.build = series(
    clearBundles,
    build_only_mvc_min,
    build_only_mvc_full,
    build_mvc_with_deps_min,
    build_mvc_with_deps_full,
    build_examples
);

exports.watch = function watchSrc() {
    watch([
        "./examples/**/*.ts",
        "./examples/**/*.tsx",
        "./examples/**/*.css"
    ], build_examples);

    watch([
        "./lib/**/*.ts",
        "./lib/**/*.tsx"
    ], series(
        clearBundles,
        build_only_mvc_min,
        build_only_mvc_full,
        build_mvc_with_deps_min,
        build_mvc_with_deps_full
    ));
};

exports["build-examples"] = build_examples;