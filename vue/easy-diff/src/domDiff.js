let patches = {},
    vnIndex = 0;

function domDiff(oldVDom, newVDom) {
    let index = 0;
    vNodeWalk(oldVDom, newVDom, index);
    return patches;
}

function vNodeWalk(oldNode, newNode, index) {
    let vnPatch = [];
    // 判断新节点是否存在
    if (!newNode) {
        vnPatch.push({ type: 'REMOVE', index });
    } else if (typeof oldNode === 'string' && typeof newNode === 'string') {
        // 判断新老节点是否是纯文本的替换
        if (oldNode !== newNode) {
            vnPatch.push({ type: 'TEXT', text: newNode });
        }
    } else if (oldNode.type === newNode.type) {
        // 判断新老节点属性是否发生变化
        const attrPatch = attrsWalk(oldNode.props, newNode.props);

        if (Object.keys(attrPatch).length > 0) {
            vnPatch.push({ type: 'ATTRS', attrs: attrPatch });
        }

        childrenWalk(oldNode.children, newNode.children);
    } else {
        vnPatch.push({ type: 'REPLACE', newNode });
    }

    if (vnPatch.length > 0) {
        patches[index] = vnPatch;
    }
}

function attrsWalk(oldAttrs, newAttrs) {
    let attrPatch = {};

    for (let key in oldAttrs) {
        // 修改属性
        if (oldAttrs[key] !== newAttrs[key]) {
            attrPatch[key] = newAttrs[key];
        }
    }

    for (let key in newAttrs) {
        // 新增属性
        if (!oldAttrs.hasOwnProperty(key)) {
            attrPatch[key] = newAttrs[key];
        }
    }

    return attrPatch;
}

// 深度遍历子节点的属性
function childrenWalk(oldChildren, newChildren) {
    oldChildren.map((c, idx) => {
        vNodeWalk(c, newChildren[idx], ++vnIndex)
    })
}

export default domDiff;