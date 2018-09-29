const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base')
const nodeExternals = require('webpack-node-externals')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const config = merge(base, {
  target: 'node',
  devtool: process.env.NODE_ENV === 'development' ? '#source-map' : false,
  entry: './src/server/index.js',
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'ajax': '@/server/axios'
    }
  },
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
});

module.exports = config;