"use strict";

module.exports = {
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx"]
    },

    optimization: {
        minimize: false,
        namedModules: true
    },

    output: {
        path: __dirname,
        filename: "[name]/bundle.js"
    },
    
    module: {
        rules: [
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
        ]
    },

    externals: {
        react: "React",
        "react-dom": "ReactDOM",
        "mvc-tsx": "MVC",
        "events": "EventEmitter"
    }
};