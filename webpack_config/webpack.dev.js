const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");

const devConfig = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: 3000,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "https://your-api-url",
                changeOrigin: true,
            },
        },
    },
};
module.exports = merge(commonConfig, devConfig);