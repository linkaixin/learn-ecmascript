import { setAttrs, render } from "./virtualDom.js";
import Element from "./Element.js";

let finalPacthes = {},
    rnIndex = 0;

function doPatch(rDom, patches) {
    finalPacthes = patches;
    rNodeWalk(rDom);
}

function rNodeWalk(rNode) {
    const rnPacth = finalPacthes[rnIndex++],
        childNodes = rNode.childNodes;

    [...childNodes].map((c) => {
        rNodeWalk(c);
    })

    if (rnPacth) {
        patchAction(rNode, rnPacth)
    }
}

function patchAction(rNode, rnPacth) {
    rnPacth.map(p => {
        switch (p.type) {
            case 'ATTRS':
                for (let key in p.attrs) {
                    const value = p.attrs[key];

                    if (value) {
                        setAttrs(rNode, key, value)
                    } else {
                        rNode.removeAttribute(key)
                    }
                }
                break;
            case 'TEXT':
                rNode.textContent = p.text;
                break;
            case 'REPLACE':
                const newNode = p.newNode instanceof Element ? render(p.newNode) : document.createTextNode(p.newNode)
                rNode.parentNode.replaceChild(newNode, rNode);
                break;
            case 'REMOVE':
                rNode.parentNode.removeChild(rNode);
                break;
            default:
                break;
        }
    })
}

export default doPatch;