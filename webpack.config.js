const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: {
		main: './src/pages/main.scss',
		index: './src/index.js',
		colorsType: './src/pages/colors-type/colors-type.js',
		formElements: './src/pages/form-elements/form-elements.js',
		//headersFooters: './src/pages/headers-footers/headers-footers.js',
		//cards: './src/pages/cards/cards.js',
		//toxin: './src/pages/toxin/main.js'
	},

	output: {
		path: path.resolve(__dirname, 'build')
	},

	module: {
		rules: [
			{
				test: /\.pug$/,
				loader: 'pug-loader'
			},
			{
				test: /\.s?css$/,
				loader: [
					MiniCssExtractPlugin.loader,
					'css-loader?url=false',
					'sass-loader'
				]
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/pages/index.pug',
			chunks: ['main']
		}),

		new HtmlWebpackPlugin({
			filename: 'pages/colors-type.html',
			template: './src/pages/colors-type/colors-type.pug',
			chunks: ['main', 'colorsType']
    }),
    
    new HtmlWebpackPlugin({
			filename: 'pages/form-elements.html',
			template: './src/pages/form-elements/form-elements.pug',
			chunks: ['main', 'formElements']
    }),
    
    new HtmlWebpackPlugin({
			filename: 'pages/main.html',
			template: './src/pages/toxin/main.pug',
			chunks: ['main', 'toxin']
		}),

		/* new HtmlWebpackPlugin({
			filename: 'pages/headers-footers.html',
			template: './src/pages/headers-footers/headers-footers.pug',
			chunks: ['main', 'headersFooters']
		}),

		new HtmlWebpackPlugin({
			filename: 'pages/cards.html',
			template: './src/pages/cards/cards.pug',
			chunks: ['main', 'cards']
		}),
		*/
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
			chunkFilename: '[id].css'
		}),

		new CopyWebpackPlugin([
			{
				from: './src/img',
				to: './img'
			},
			{
				from: './src/fonts',
				to: './fonts'
			}
		]),
	],

	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		overlay: true,
	},

};