import { ref, createRefSet } from './hook'
import { render } from './render';
import { event } from './event';

export function createApp(el, {
    refs,
    methods
}) {
    // 收集依赖
    const $el = document.querySelector(el);
    const allNodes = $el.querySelectorAll('*');
    const refSet = createRefSet(refs, allNodes)
    // 渲染
    render(refSet)
    // 绑定事件
    event(methods, allNodes, refSet)
}

export {
    ref
}