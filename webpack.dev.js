const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    mode: "development",
    devtool: "eval-source-map",
    devServer: {
        static: "./dist",
        hot: true,
        open: true,
        port: 8080,
        liveReload: true,
        watchFiles: ["src/**/*.html", "public/**/*.html"],
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
    },
});
