const {
    readBodyStream,
    rewriteImports
} = require('../../libs/utils')

async function moduleRewrite({ app, appPath }) {
    app.use(async (ctx, next) => {
        // 等待staticService插件执行完成再往下执行
        await next();

        // 判断是否是js文件
        if (ctx.body && ctx.response.is('js')) {
            // 要将main.js中不认识的依赖改成认识的依赖路径
            const result = await readBodyStream(ctx.body);
            const resBody = await rewriteImports(result);

            // 更改ctx下的body
            ctx.type = 'js';
            ctx.body = resBody;
        }
    })
}

module.exports = moduleRewrite