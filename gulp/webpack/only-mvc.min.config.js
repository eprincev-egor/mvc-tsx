"use strict";

const path = require("path");
const defaultConfig = require("./common/default");
const externals = require("./common/externals");

module.exports = {
    ...defaultConfig,

    output: {
        libraryTarget: "umd",
        path: path.join(__dirname, "..", "..", "bundle"),
        filename: "only-mvc.min.js"
    },

    externals
};