const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin =
    require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    output: {
        publicPath: "/",
    },
    resolve: {
        alias: {
            "react": "preact/compat",
            "react-dom": "preact/compat",
        },
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        plugins: [
                            [
                                "@babel/plugin-transform-react-jsx",
                                {
                                    pragma: "h",
                                    pragmaFrag: "Fragment",
                                },
                            ]

                        ],
                    }

                }
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.(png|jpe?g|gif|woff|eot|ttf)$/i,
                use: [{ loader: "file-loader" }],
            },
            {
                test: /\.css$/i,
                use: ["style-loader","css-loader"],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        //new BundleAnalyzerPlugin(),//the bundle analyzer tell the size of each js bundle
    ],
};