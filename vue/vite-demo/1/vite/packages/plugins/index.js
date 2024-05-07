const staticService = require('./staticService')
const moduleRewrite = require('./moduleRewrite')
const vueFileRewrite = require('./vueFileRewrite')

module.exports = [
    moduleRewrite,
    vueFileRewrite,
    staticService,
]