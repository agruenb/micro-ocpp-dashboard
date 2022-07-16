const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const prodConfig = {
    mode: "production",
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin()
        ],
    },
    plugins:[
        new Dotenv({
			path: `./.env.production`
		})
    ]
};
module.exports = merge(commonConfig, prodConfig);