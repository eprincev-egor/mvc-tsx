"use strict";

const path = require("path");
const defaultConfig = require("./common/default");

const rootDir = path.join(__dirname, "..", "..");
const depsDir = path.join(rootDir, "deps");

module.exports = {
    ...defaultConfig,

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx"],

        alias: {
            react: path.join(depsDir, "react.js"),
            "react-dom": path.join(depsDir, "react-dom.js"),
            events: path.join(depsDir, "events.js")
        }
    },

    output: {
        libraryTarget: "umd",
        path: path.join(rootDir, "bundle"),
        filename: "mvc-and-deps.min.js"
    }
};