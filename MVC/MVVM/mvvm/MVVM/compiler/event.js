import { checkType, randomNum } from "../shared/utils";

const reg_onClick = /onClick\=\"(.+?)\"/g;
const reg_fnName = /^(.+?)\(/;
const reg_arg = /\((.*?)\)/;

const eventPool = [];
// 绑定data-mark节点和将事件存入数组中
export function eventFormat(template) {
    return template.replace(reg_onClick, function (_, key) {
        const _mark = randomNum();

        eventPool.push({
            mark: _mark,
            hanlder: key.trim(),
            type: 'click'
        })

        return `data-mark="${_mark}"`
    })
}

// 绑定事件
export function bindEvent(methods) {
    const allElements = document.querySelectorAll('*');
    let oItem = null,
        _mark = 0;

    eventPool.forEach(event => {
        for (let i = 0; i < allElements.length; i++) {
            oItem = allElements[i];
            _mark = parseInt(oItem.dataset.mark);

            if (event.mark === _mark) {
                oItem.addEventListener(event.type, function () {
                    const fnName = event.hanlder.match(reg_fnName)[1];
                    const arg = checkType(event.hanlder.match(reg_arg)[1]);
                    methods[fnName](arg);
                }, false)
            }
        }
    })
}