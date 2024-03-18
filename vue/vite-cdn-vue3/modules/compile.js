const customTags = ['if', 'for'];
const reg_single_bracket = /\{(.*?)\}/g;
const reg_double_bracket = /\{\{(.*?)\}\}/g;

export function compileTemplate(template, state) {
    template = replaceVar(template, state, reg_double_bracket);
    const _node = document.createElement('div');
    _node.innerHTML = template;
    return compileNode(_node, state);
}

function compileNode(node, state) {
    const allNodes = node.querySelectorAll('*');
    allNodes.forEach(item => {
        const tagName = item.tagName.toLowerCase();

        if (customTags.includes(tagName)) {
            replaceNode(item, tagName, state);
        }
    })

    return Array.from(node.childNodes).find(item => item.nodeType === 1)
}

function replaceNode(node, tag, state) {
    const dataKey = node.getAttribute('data'),
        className = node.className,
        realTag = node.getAttribute('tag');

    switch (tag) {
        case 'for':
            vFor(node, state, dataKey, className, realTag);
            break;
        default:
            break;
    }
}

function vFor(node, state, dataKey, className, realTag) {

    let oFrag = document.createDocumentFragment();

    state[dataKey].forEach(item => {
        const el = document.createElement(realTag);
        el.className = className ? className : '';
        el.innerHTML = replaceVar(node.innerHTML, item, reg_single_bracket)
        oFrag.appendChild(el);
    })

    node.parentNode.replaceChild(oFrag, node);
}

function replaceVar(html, data, reg) {
    return html.replace(reg, (_, key) => {
        return data[key.trim()];
    })
}