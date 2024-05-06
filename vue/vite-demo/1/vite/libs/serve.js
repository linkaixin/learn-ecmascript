const koa = require('koa');
const app = new koa();

async function createServe() {
    return {
        async listen(port, cb) {
            app.listen(port, cb);
        }
    }
}

exports.createServe = createServe;
exports.app = app;