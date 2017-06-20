const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  target: 'web',
  devtool: 'inline-source-map',
  entry: './src/app/app.js',
  output: {
    path: path.resolve(__dirname, '../../dist/app'),
    //publicPath: '/app/',
    filename: 'app.js'
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
			{
				test: /\.(eot|svg|ttf|woff|woff2)/,
				loader: 'file-loader',
				options: { name: 'fonts/[name].[ext]' }
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				exclude: /fontawesome-webfont/, // fontawesome-webfont.svg
				loader: 'file-loader',
				options: { name: 'img/[name].[ext]' }
			},
      {
				test: /\.tag(.html)?$/,
        exclude: /node_modules/,
        loader: 'riot-tag-loader',
        options: {
          type: 'es6', // transpile the riot tags using babel
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
			template: './src/app/index.html',
			filename: '../../dist/app/index.html'
		})
	]
}
