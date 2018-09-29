const { resolve } = require('path');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const autoPreFixer = require('autoprefixer');
const px2rem = require('postcss-plugin-px2rem');

const config = {

	mode: process.env.NODE_ENV || 'production',

	context: resolve(__dirname, '../'),

	entry: {
		app: './src/client/index.js',
	},

	output: {
		publicPath: '/',
		path: resolve(__dirname, '../dist/'),
		filename: 'js/[name].[hash].js'
	},

	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm',
			'@': resolve('./src'),

			// 兼容老项目组件 - 后期做优化
			'@root': resolve('src')
		}
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				include: [
					resolve(__dirname, '../src')
				],
				options: {
					extractCSS: process.env.NODE_ENV === 'production',
					postcss: [
						autoPreFixer({
							browsers: ['last 10 versions', 'Firefox >= 20', '> 1%', 'iOS 4', 'android >= 2.0', 'and_uc > 1']
						}),
						px2rem({
							rootValue: 100,
							minPixelValue: 2,
							selectorBlackList: ['.no-replace-rem']
						})
					]
				}
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: [
					resolve(__dirname, '../src/utils/irc.min.js')
				],
				include: [
					resolve(__dirname, '../src')
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit:3500,
					outputPath: 'images'
				}
			}
		]
	},

	plugins: [
        new VueLoaderPlugin(),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('../dist/static/vendor-manifest.json')
		})
	]
};

// 正式环境提取css
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(new extractTextWebpackPlugin('css/[name].[chunkhash].css'));
} else {
	// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
	// config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;