const { join } = require('path');
const { readFileSync } = require('fs');
const { vueNodeModulePath } = require('../../libs/utils')

async function vueFileRewrite({ app, appPath }) {
    app.use(async (ctx, next) => {
        // 获取.vue文件
        console.log(ctx.path);
        if (!ctx.path.endsWith('.vue')) {
            return next();
        }

        // F:\1\lx\learn-ecmascript\vue\vite-demo\1\my-vue\App.vue
        const vuePath = join(appPath, ctx.path);
        const vueContent = readFileSync(vuePath, 'utf-8');
        const { parse, compileTemplate } = require(join(appPath, vueNodeModulePath('compiler-sfc', 'compiler-sfc.cjs.js')))
        const { descriptor: { template, script } } = parse(vueContent);

        ctx.type = 'js';

        if (!ctx.query.type) {
            let source = '';
            script && (source += scriptRewrite(script))
            template && (source += templateRewrite(ctx.path))
            source += `\nexport default $script`;

            ctx.body = source;
        }

        if (ctx.query.type === 'template') {
            ctx.body = templateCompile(template, ctx.path, compileTemplate)
        }
    })
}

function scriptRewrite(script) {
    const { content } = script;
    return content.replace(/^export default {/m, 'const $script = {');
}

function templateRewrite(path) {
    return `
        \nimport { render as __render } from '${path}?type=template'
        \n$script.render = __render
    `
}

function templateCompile({ content }, path, compileTemplate) {
    const source = content;
    const id = path;
    return compileTemplate({ source, id }).code
}

module.exports = vueFileRewrite;