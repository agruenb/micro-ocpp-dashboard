const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
    mode: "production",
    plugins:[
        new Dotenv({
			path: `./.env.production`
		})
    ]
};
module.exports = merge(commonConfig, prodConfig);