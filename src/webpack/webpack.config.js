const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
	devtool: 'inline-source-map',
  entry: './src/webpack/app.js',
  output: {
    path: path.resolve(__dirname, '../../dist/webpack'),
    //publicPath: '/public/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				loader: 'file-loader',
				options: { name: 'img/[name].[ext]' }
			},
			//{ test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader', options: { limit: 100000 } },
			{
				test: /\.tag(.html)?$/,
				exclude: /node_modules/,
				loader: 'riot-tag-loader',
				options: { type: 'es6', /*hot: true,*/ debug: true } // transpile the riot tags using babel
			}
    ]
  },
	plugins: [
		new HtmlWebpackPlugin({
			inject: 'body',
			hash: true,
			template: './src/webpack/index.html',
			filename: 'index.html'
		})
	]
}
