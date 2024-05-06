const { Readable } = require('stream');
const { parse: esModuleParse } = require('es-module-lexer');
const MagicString = require('magic-string');

const readBodyStream = async (bodyStream) => {
    // 读取流
    if (bodyStream instanceof Readable) {
        let result = '';
        return new Promise((resolve, reject) => {
            bodyStream.on('data', (chunk) => result += chunk);
            bodyStream.on('end', () => resolve(result));
        })
    }
    return bodyStream;
}

const rewriteImports = async (source) => {
    const imports = esModuleParse(source)[0];
    console.log("🚀 ~ rewriteImports ~ imports:", imports)
    const magicString = new MagicString(source);

    if (imports.length > 0) {
        imports.forEach(_import => {
            const { s, e } = _import;
            let importId = source.slice(s, e);
            // 如果不是以ESMODULE认识的./或/开头，则需要修改路径
            if (/^[^\.\/]/.test(importId)) {
                importId = vueNodeModulePath('compiler-dom', moduleMapping(importId))
                magicString.overwrite(s, e, importId);
            }
        })
    }
    return magicString.toString();
}

const moduleMapping = (importId) => {
    switch (importId) {
        case 'vue':
            return 'compiler-dom.esm-browser.js';
        default:
            break;
    }
}

const vueNodeModulePath = (package, filename) => {
    return `/node_modules/@vue/${package}/dist/${filename}`;
}


module.exports = {
    readBodyStream,
    rewriteImports
}