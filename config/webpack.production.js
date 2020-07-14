/**
 *
 * @file   webpack.production.js
 * @author Jérémy Levron <jeremylevron@19h47.fr> (http://19h47.fr)
 */

const glob = require('glob-all');
const path = require('path');

const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

module.exports = merge(common, {
	output: {
		filename: 'application.js',
	},
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
							sassOptions: Object.assign({
								sourceMap: false,
								precision: 10,
							}),
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
		new PurgecssPlugin({
			paths: glob.sync([
				path.join(__dirname, '..', 'templates/**/*.liquid'),
				path.join(__dirname, '..', 'templates/**/*.liquid'),
			]),
			whitelist: [
				// page
				'About-page',
				'Archive-page',
				'Front-page',
				'Horizontal-page',
				'Page',
				'Single-product',
				'Single-project',
				// template
				'page-template-horizontal-page',
				'page-template-archive-page',
				// state
				'is-disabled',
				'is-off',
				'is-focus',
				'is-current',
				'is-selected',
				'is-loading',
				'is-active',
				'is-in-view',
				'is-native-scroll',
				'is-selected',
				'is-hidden',
				'has-background',
				'menu--is-open',
				'modal--is-open',
				'Menu--footer',
				'menu-mobile--is-open',
				'product-type-variable',
				'current-lang',
				'error-message',
				'success-message',
				'screen-reader-text',
				'column-3',
				'column-4',
				'column-10',
				// tag
				'select',
				'iframe',
				'input',
				'button',
				'textarea',
				'blockquote',
				'span',
				'a',
			],
			whitelistPatternsChildren: [
				/^woocommerce/,
				/^Cart/,
				/^Form/,
				/^leaflet-/,
				/^tippy-/,
				/^wp-block-/,
				/^flickity-/,
				/^wpcf7-/,
				/^Form__list/,
				/^Share__link--/,
				/^noUi/,
				/^Calendar/,
				/^grecaptcha/,
				/^Product/,
				/^jetpack/,
				/^select2/,
			],
		}),
	],
});
