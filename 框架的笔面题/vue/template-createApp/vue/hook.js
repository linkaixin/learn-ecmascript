import Ref from './Ref'
export function ref(initialValue) {
    // 返回Ref对象 
    return new Ref(initialValue)
}

// 收集依赖
export function createRefSet(refs, node) {
    const reg_var = /\{\{(.+?)\}\}/;
    node.forEach(el => {
        if (reg_var.test(el.textContent)) {
            const key = el.textContent.match(reg_var)[1].trim();
            if (refs[key]) {
                refs[key].deps.add(el)
            }
        }
    });
    return refs;
}