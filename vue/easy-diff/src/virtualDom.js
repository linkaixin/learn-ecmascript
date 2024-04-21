import Element from "./Element.js"
// 将虚拟节点转换成看得到的对象
function createElement(type, props, children) {
    return new Element(type, props, children)
}

// 将虚拟节点对象转换成真实DOM
function render(vDom) {
    const { type, props, children } = vDom,
        el = document.createElement(type);

    for (const key in props) {
        setAttrs(el, key, props[key]);
    }

    children.map(c => {
        // 判断children中是不是纯文本节点，还是Element对象
        c = c instanceof Element ? render(c) : document.createTextNode(c);
        el.appendChild(c);
    })

    return el;
}

// 为el添加属性
function setAttrs(node, prop, value) {
    switch (prop) {
        case 'value':
            if (node.tagName.toLowerCase() === 'input' || node.tagName.toLowerCase() === 'textarea') {
                node.value = value;
            } else {
                node.setAttribute(prop, value);
            }
            break;
        case 'style':
            node.style.cssText = value;
            break;
        default:
            node.setAttribute(prop, value);
            break;
    }
}

function renderDOM(rDom, rootEl) {
    rootEl.appendChild(rDom);
}


export {
    createElement,
    render,
    setAttrs,
    renderDOM
}

