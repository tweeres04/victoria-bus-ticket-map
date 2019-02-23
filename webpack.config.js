require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/main.js',
	output: {
		filename: '[name].[hash].js',
		path: path.join(__dirname, 'dist')
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			inject: false,
			googleMapsKey: process.env.GOOGLE_MAPS_KEY
		})
	]
};
