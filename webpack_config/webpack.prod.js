const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const Dotenv = require('dotenv-webpack');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const prodConfig = {
    mode: "production",
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin()
        ],
    },
    module:{
        rules:[
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,"css-loader"],
            },
        ]
    },
    plugins:[
        new Dotenv({
			path: `./.env.production`
		}),
        new MiniCssExtractPlugin()
    ]
};
module.exports = merge(commonConfig, prodConfig);