import { randomNum } from "../shared/utils";

const reg_html = /\<.+?\>\{\{(.+?)\}\}\<\/.+?\>/g;
const reg_tag = /\<(.+?)\>/;
const reg_var = /\{\{(.+?)\}\}/g;

export const statePool = [];

let o = 0;

export function stateFormat(template, state) {
    let _state = {};
    template = template.replace(reg_html, function (node, key) {
        const match = node.match(reg_tag);
        const _mark = randomNum();
        _state.mark = _mark;
        statePool.push(_state);
        _state = {};
        return `<${match[1]} data-mar k="${_mark}">{{${key}}}</${match[1]}>`
    })
    // 初始化变量 将模版字符串中的字符串转换成变量
    // 并且将所有的模版字符串和mark存在一个数组中一一对应，在修改的时候使用
    template = template.replace(reg_var, function (node, key) {
        var _var = key.trim();
        const _varArr = _var.split('.');

        let i = 0;

        while (i < _varArr.length) {
            _var = state[_varArr[i++]];
        }

        _state.state = _varArr;

        statePool[o++].state = _varArr;

        return _var;
    })

    return template;
}