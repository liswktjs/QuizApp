const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',

	entry: '/src/index.tsx',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: '[name].[contenthash].js',
		publicPath: '/',
		clean: true,
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	},
	devServer: {
		historyApiFallback: true,
		port: 3000,
		hot: true,
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				generator: {
					filename: '[name].[contenthash].css',
				},
			},
			{
				test: /\.(js|jsx|ts|tsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: '/public/index.html',
		}),
	],
};
