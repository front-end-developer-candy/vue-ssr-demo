/**
 * 主程序
 */

const express = require('express');
const path = require('path');
const {createBundleRenderer} = require('vue-server-renderer');

const app = express();
const resolve = root => path.resolve(__dirname, root);
const templatePath = resolve('./src/index.html');
let renderer = null;

function createRenderer(bundle, options) {
    try {
        return createBundleRenderer(bundle, Object.assign(options, {
            basedir: resolve('./dist'),
            runInNewContext: 'once' || false,
            inject: false
        }));
    } catch (e) {
        console.log(e);
    }
};

const readyPromise = require('./build/dev-server')(
    app,
    templatePath,
    (bundle, options) => {
        console.log('到了这里');
        renderer = createRenderer(bundle, options);
    }
);

const render = (req, res) => {

    res.setHeader("Content-Type", "text/html");

    renderer.renderToString(req, (err, html) => {

        if (err) return console.error(err);

        res.send(html);

    });

}

app.get('*', (req, res) => readyPromise.then(() => render(req, res)));

app.listen(7000);
