"use strict";

const rules = [
    {
        test: /\.ts(x?)$/,
        use: [
            {
                loader: "ts-loader"
            }
        ]
    },
    // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
    {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
    }
];

module.exports = rules;