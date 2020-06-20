"use strict";

const path = require("path");
const defaultConfig = require("./common/default");
const externals = require("./common/externals");

module.exports = {
    ...defaultConfig,

    optimization: {
        minimize: false,
        namedModules: true
    },

    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, "..", "..", "bundle"),
        filename: "only-mvc.full.js"
    },

    externals
};