const koa = require('koa');

const app = new koa();

// 洋葱圈模型举例
async function mw1(ctx, next) {
    console.log(1);
    await next();   // 等待mw2运行完成
    console.log(2);
}

async function mw2(ctx, next) {
    console.log(3);
    await next();   // 等待mw3运行完成
    console.log(4);
}

async function mw3(ctx, next) {
    console.log(5);
    await next();   // 没有的等待，所以接着运行
    console.log(6);
}

// 输出结果135642
app.use(mw1);
app.use(mw2);
app.use(mw3);

app.listen('9000', () => {
    console.log('listen to serve 9000');
})