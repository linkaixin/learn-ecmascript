export function event(methods, node, ref) {
    node.forEach(el => {
        const methodName = el.getAttribute('@click');
        if (methodName) {
            el.addEventListener('click', methods[methodName].bind(ref), false)
        }
    })
}