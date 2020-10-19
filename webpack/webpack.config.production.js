/**
 *
 * @file webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	mode: 'production',
	devtool: false,
	watch: false,
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: false,
						},
					},
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								sourceMap: false,
								precision: 10,
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: 'application.scss.css',
		}),
		new CompressionPlugin(),
		new CopyPlugin({
			patterns: [{ from: 'assets/icons.svg', to: '../snippets/icons.liquid' }],
		}),
	],
};
