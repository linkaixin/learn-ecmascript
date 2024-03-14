import { transformToKebab } from "./utils";

const REG_OBJ = /^\{(.+?)\}$/;
const REG_ARR = /^\[(.+?)\]$/;

export function compileAttr(vm, el, name, value) {
    // 移除空白格
    value = value.replace(/\s+/g, '');
    name = name.replace(':', '');

    vm.$stylePool.set(el, {
        type: name,
        expression: value
    })

    switch (name) {
        case 'class':
            if (REG_OBJ.test(value)) {
                const keyValueArr = value.match(REG_OBJ)[1].split(',')
                let classStr = '';

                keyValueArr.forEach(item => {
                    const [key, value] = item.split(':');
                    if (vm[value.trim()]) {
                        classStr += ` ${key.trim()}`;
                    }
                })
                el.setAttribute('class', classStr.trim());

            } else if (REG_ARR.test(value)) {
                const classArr = renderArr(vm, value)
                el.setAttribute('class', classArr.join(' ').trim());
            }
            break;
        case 'style':
            let styleStr = '';
            if (REG_OBJ.test(value)) {
                const styleObj = renderObj(vm, value);
                for (const key in styleObj) {
                    styleStr += `${transformToKebab(key)}:${styleObj[key]};`
                }
            } else if (REG_ARR.test(value)) {
                const styleArr = renderArr(vm, value);
                console.log("🚀 ~ compileAttr ~ styleArr:", styleArr)
                styleArr.forEach(item => {
                    for (const key in item) {
                        styleStr += `${transformToKebab(key)}:${item[key]};`
                    }
                })
            }
            el.setAttribute('style', styleStr);
            break;
        default:
            break;
    }
}

function renderArr(vm, value) {
    const _arr = (new Function(
        'vm',
        `with(vm){
            return ${value};
        }`
    ))(vm)

    return _arr.filter(item => item);
}

function renderObj(vm, value) {
    return (new Function(
        'vm',
        `with(vm){
            return ${value};
        }`
    ))(vm)
}