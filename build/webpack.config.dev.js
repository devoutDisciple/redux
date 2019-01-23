const path = require("path");
const webpack = require("webpack");
const webpackBaseConfig = require("./webpack.config.base");
// 获取npm后面的命令
// const commandTarget = process.env.npm_lifecycle_event; // npm run start:build 获取的是start:build

let baseConfig = webpackBaseConfig("development");

let devPlugins = [
	new webpack.DefinePlugin({
		"process.env.NODE_ENV": JSON.stringify("development"), // 一定要用json.stringify，如果是单引号的'development',不正确，是定义不了process.env.NODE_ENV的
	}),
	new webpack.NoEmitOnErrorsPlugin(), // 允许js出错不中断服务
	new webpack.HotModuleReplacementPlugin(), // 热更新
];

let devConfig = {
	devServer: {
		contentBase: path.resolve(__dirname, "../dist"),
		port: 9417,
		open: true,
	},
	devtool: "inline-source-map",
};

devConfig = Object.assign(baseConfig, devConfig);

devConfig.plugins = devConfig.plugins.concat(devPlugins);

module.exports = devConfig;
