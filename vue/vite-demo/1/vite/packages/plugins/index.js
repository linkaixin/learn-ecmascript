const staticService = require('./staticService')
const moduleRewrite = require('./moduleRewrite')

module.exports = [
    moduleRewrite,
    staticService,
]