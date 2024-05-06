const static = require('koa-static');
const { resolve } = require('path');

async function staticService({ app, appPath }) {
    app.use(static(appPath));
    app.use(static(resolve(appPath, 'public')));
}

module.exports = staticService;