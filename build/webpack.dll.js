// dll 文件配置，优化打包速度

const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {

    mode: 'production',

    entry: {

        // 资源文件打包
        vendor: [
            'axios',
            'vue-router',
            'vue/dist/vue.esm',
            'vuex',
            'fastclick'
        ]
    },
    output: {
        publicPath: '/',
        path: resolve(__dirname, '../dist/static'),
        filename: '[name].dll.js',
        library: '[name]_library'
    },

    optimization: {
        minimize: true
    },

    plugins: [

        new webpack.DllPlugin({
            path: resolve(__dirname, '../dist/static/[name]-manifest.json'),
            name: '[name]_library',
            context: __dirname
        })

    ]
};