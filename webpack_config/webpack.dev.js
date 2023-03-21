const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.common");
const Dotenv = require('dotenv-webpack');

const devConfig = {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        port: 3000,
        historyApiFallback: true,
    },
    plugins:[
        new Dotenv({
			path: `./.env.development`
		})
    ]
};
module.exports = merge(commonConfig, devConfig);