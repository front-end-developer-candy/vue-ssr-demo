const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const SWPrecachePlugin = require('sw-precache-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const AppCachePlugin = require('appcache-webpack-plugin');

const config = merge(base, {
  entry: {
    app: './src/client/index.js'
  },
  resolve: {
    alias: {
      'ajax': '@/client/axios'
    }
  },

  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      cacheGroups: {
        // 公共资源文件打包
        commons: {
          test: /[\\/](node_modules|components|service|utils)[\\/]/,
          name: "vendor",
          chunks: "all"
        }
      }
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

if (process.env.NODE_ENV === 'production') {

  config.plugins.push(
    new AppCachePlugin({
      network: null,
      fallback: [],
      settings: ['prefer-online'],
      exclude: [],
      output: 'manifest.appcache'
    })
  );

  config.plugins.push(
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/(top|new|show|ask|jobs)/,
          handler: 'networkFirst'
        },
        {
          urlPattern: '/item/:id',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/user/:id',
          handler: 'networkFirst'
        }
      ]
    })
  )
}

module.exports = config;