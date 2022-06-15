const path = require("path");

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
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [{ loader: "file-loader" }],
            },
            {
                test: /\.scss|\.css|\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        //new BundleAnalyzerPlugin(),//the bundle analyzer tell the size of each js bundle
    ],
};