import { eventFormat, stateFormat } from ".";
import { bindEvent } from "./compiler/event";

// 渲染模版
export function userDOM({ template, state, methods }, rootDom) {
    rootDom.innerHTML = render(template, state);
    // 绑定事件
    bindEvent(methods);
}

export function render(template, state) {
    // 为了绑定事件
    template = eventFormat(template)
    // 初始化数据
    template = stateFormat(template, state)
    return template
}

export function update(statePool, key, value) {
    const allElements = document.querySelectorAll('*');
    let oItem = null;

    statePool.forEach(item => {
        if (item.state[item.state.length - 1] === key) {
            for (let i = 0; i < allElements.length; i++) {
                oItem = allElements[i];

                const _mark = parseInt(oItem.dataset.mark);

                if (_mark === item.mark) {
                    oItem.innerHTML = value;
                }
            }
        }
    });
}