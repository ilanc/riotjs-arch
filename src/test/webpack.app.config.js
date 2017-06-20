const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	target: 'web',
	devtool: 'inline-source-map',

	resolve: {
		extensions: [
			".js"
		]
	    },
	entry: {
		app: [
			"./src/test/app.js"
		]
	},
	output: {
		path: path.join(__dirname, '/../../dist/test/'),
		filename: "[name].min.js"
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader', options: { base: 2000 } },
					'css-loader'
				]
			},
			{ test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'file-loader', options: { name: 'img/[name].[ext]' } },
			//{ test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader', options: { limit: 100000 } },
			{ test: /\.tag(.html)?$/, exclude: /node_modules/, loader: 'riot-tag-loader', options: { type: 'es6', /*hot: true,*/ debug: true } }, // transpile the riot tags using babel
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			template: './src/test/index.html',
			filename: 'index.html'
		})
	]
};
