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
			"./src/router/app.js"
		]
	},
	output: {
		path: path.join(__dirname, '/../../dist/router/'),
		filename: "[name].min.js"
	},
	module: {
		rules: [
      {
				test: /\.tag(.html)?$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        options: {
          //type: 'es6', // NO!!!
          hot: true,
          debug: true
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			template: './src/router/index.html',
			filename: 'index.html'
		})
	]
};
