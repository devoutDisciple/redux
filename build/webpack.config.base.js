const path = require("path");
const webpack = require("webpack");
const os = require("os");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanCSSPlugin = require("less-plugin-clean-css");
const HappyPack = require("happypack");
const happyThreadPoolLength = os.cpus().length;
const getRealPath = (temPath) => {
	return path.resolve(__dirname, temPath);
};
const node_modules = getRealPath("../node_modules");

module.exports = () => {
	let configuration = {
		entry: ["babel-polyfill", getRealPath("../src/main.jsx")],
		output: {
			path: getRealPath("../dist"),
			filename: "bundle.js",
		},
		module: {
			rules: [{
					test: /\.js|.jsx$/,
					exclude: node_modules,
					use: [{
						loader: "babel-loader",
					}],
				},
				{
					test: /\.css$/,
					use: [{
						loader: "style-loader",
					}, {
						loader: "css-loader",
					}]
				},
				{
					test: /\.less$/,
					include: node_modules,
					use: [{
						loader: "style-loader",
					}, {
						loader: "css-loader",
					}, {
						loader: "less-loader",
						options: {
							javascriptEnabled: true,
							plugins: [
								new CleanCSSPlugin({
									advanced: true
								}), // 用于压缩css
							]
						},
					}]
				},
				{
					test: /\.(png|svg|jpg|gif|woff|woff2|eot|ttf|otf)$/,
					exclude: getRealPath("../assets"),
					use: [{
						loader: "url-loader",
						options: {
							limit: "1024",
							name: "[path][name].[ext]",
							outputPath: "img/",
							publicPath: "img"
						}
					}, ]
				}
			],
		},
		resolve: {
			extensions: [".js", ".vue", ".less", ".json", ".jsx"],
		},
		plugins: [
			new HappyPack({
				// 如何处理 用法和loader 的配置一样
				loaders: ["babel-loader"],
				threads: happyThreadPoolLength
			}),
			new HtmlWebpackPlugin({
				title: "react demo",
				template: "index.html",
				filename: "index.html",
				hash: true,
				minify: true
			}),
			// 打包moment.js的中文，防止local全部打包
			new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
			// 根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小，该模块推荐使用
			new webpack.optimize.OccurrenceOrderPlugin()
		]
	};
	return configuration;
};
