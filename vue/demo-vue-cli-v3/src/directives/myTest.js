export default {
    mounted
}

function mounted(el, bindings, vnode, prevNode) {
    console.log('mounted', el, bindings, vnode, prevNode);
}