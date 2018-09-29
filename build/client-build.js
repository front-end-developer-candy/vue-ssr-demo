/**
 * 发布上线
 */
const prod = require('./webpack.client');
const webpack = require('webpack');
const co = require('co');

/**
 * 编译webpack
 */
const build = () => {
    return new Promise((resolve, reject) => {
        webpack(prod, (err, stats) => {
            if (err) return reject(err);
            process.stdout.write(
                stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n'
            );
            resolve();
        });
    });
}

/**
 * 流程控制
 */
co(function* () {

    // 编译 webpack
    yield build();

    // 上传 oss
    // yield ossUpload(resolve(__dirname, `../dist`), `${key}/`);
});