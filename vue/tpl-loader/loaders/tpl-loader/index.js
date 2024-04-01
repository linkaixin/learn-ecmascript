// 在node环境下运行
/**
 * 
 * @param {*} source tpl
 * @returns 
 */
function tplLoader(source) {
    return `
        export default function(component, options) {

            if(options.template){
               console.log(\`${source} \`)
            }

            if(options.data){
                console.log(component.data)
             }

             if(options.methods){
                console.log(component.methods)
             }

            component.template = \`${source} \`
            
            return component
        }
    `
}

module.exports = tplLoader;