/**
 *
 * @file webpack.config.common.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

const webpack = require('webpack');

// Plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const dotenv = require('dotenv');

const resolve = require('./webpack.utils');

dotenv.config({ path: resolve('.env') });

module.exports = {
	output: {
		filename: 'application.js',
		chunkFilename: '[name].bundle.js',
		path: resolve(process.env.PUBLIC_PATH),
	},
	resolve: {
		alias: {
			'@': resolve('src'),
			utils: resolve('src/utils'),
			icons: resolve('src/icons'),
			svg: resolve('src/img/svg'),
			jpg: resolve('src/img/jpg'),
			png: resolve('src/img/png'),
			scripts: resolve('src/scripts'),
			stylesheets: resolve('src/stylesheets'),
		},
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.(woff2?|eot|ttf|otf|woff|svg)?$/,
				exclude: [/img/, /icons/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							// outputPath: 'fonts/',
							// publicPath: '../fonts/',
						},
					},
				],
			},
			// Sprite SVG
			{
				test: /\.svg$/,
				exclude: [/img/, /fonts/],
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							spriteFilename: 'icons.svg',
							extract: true,
						},
					},
					'svg-transform-loader',
					'svgo-loader',
				],
			},
			{
				test: /\.svg$/,
				exclude: [/fonts/, /icons/],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
						},
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [
								{
									removeTitle: true,
								},
								{
									convertColors: {
										shorthex: false,
									},
								},
								{
									convertPathData: false,
								},
							],
						},
					},
				],
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|ogv)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 100000,
							name: '[name].[ext]',
							publicPath: resolve('src/videos'),
							outputPath: 'videos/',
						},
					},
				],
			},
			{
				test: /\.(gif|png|jpe?g)$/i,
				exclude: [/animations/],
				use: [
					{
						loader: 'file-loader',
						options: {
							// outputPath: 'img/',
							name: '[name].[ext]',
							// publicPath: '../img/',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: [65],
							},
							optipng: {
								enabled: false,
							},
							pngquant: {
								quality: [0.65, 0.9],
								speed: 4,
							},
							gifsicle: {
								interlaced: false,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new WebpackManifestPlugin({
			publicPath: 'assets/',
		}),
		new SpriteLoaderPlugin({ plainSprite: true }),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: [resolve('dist')],
		}),
		new WebpackNotifierPlugin({
			title: 'Webpack',
			excludeWarnings: true,
			alwaysNotify: true,
		}),
		new webpack.DefinePlugin({
			'process.env': dotenv.parsed,
		}),
	],
};
