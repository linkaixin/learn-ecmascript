let utils = {};

/**
 * 对象深拷贝
 * @param {*} obj 需要深拷贝的对象
 * @param {*} targetObj 返回的深拷贝后的对象
 * @returns 
 */
utils.deepClone = (obj, targetObj) => {
    var target = targetObj || {},
        toString = Object.prototype.toString,
        arrayText = '[object Array]';
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const element = obj[key];
            if (typeof (element) == 'object' && element !== null) {
                toString.call(element) == arrayText ? target[key] = [] : target[key] = {};
                utils.deepClone(element, target[key])
            } else {
                target[key] = element
            }
        }
    }
    return target
};

/**
 * 获取节点下的子元素兼容性
 * @param {*} ele 
 * @returns 
 */
utils.getChildNode = (ele) => {
    var child = ele.childNodes,
        len = child.length,
        temp = {
            'length': 0,
            'push': Array.prototype.push,
            'slice': Array.prototype.slice
        },
        item;

    for (let i = 0; i < len; i++) {
        item = child[i];
        if (item.nodeType === 1) {
            temp.push(item);
        }
    }

    return temp;
}

/**
 * 查看滚动条的距离
 * @returns 
 */
utils.getScrollOffset = () => {
    if (window.pageXOffset) {
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    } else {
        return {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        }
    }
}

/**
 * 浏览器的可视区域尺寸（窗口高度）
 * @returns 
 */
utils.getViewportSize = () => {
    if (window.innerWidth) {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        }
    } else {
        if (document.compatMode == 'CSS1Compat') {
            return {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight
            }
        } else {
            return {
                width: document.body.clientWidth,
                height: document.body.clientHeight
            }
        }
    }
}

/**
 * HTML文档的宽高
 * @returns 
 */
utils.getScorllSize = () => {
    if (document.body.scrollWidth) {
        return {
            width: document.body.scrollWidth,
            height: document.body.scrollHeight
        }
    } else {
        return {
            width: document.documentElement.scrollWidth,
            height: document.documentElement.scrollHeight
        }
    }
}

/**
 * 获取目标元素到浏览器的距离
 * @param {*} ele 目标元素
 * @returns 
 */
utils.getElementPosition = (ele) => {
    var parent = ele.offsetParent,
        left = ele.offsetLeft,
        top = ele.offsetTop;

    while (parent) {
        left += parent.offsetLeft;
        top += parent.offsetTop;
        parent = parent.offsetParent;
    }
    return {
        left,
        top
    }
}

/**
 * 封装pageX/Y的兼容性
 * @param {*} e 
 */
utils.pagePos = (e) => {
    var sLeft = utils.getScrollOffset().left,
        sTop = utils.getScrollOffset().top,
        // 文档偏移距离 
        cLeft = document.documentElement.clientLeft || document.body.clientLeft || 0,
        cTop = document.documentElement.clientTop || document.body.clientTop || 0;

    return {
        X: e.pageX || e.clientX + sLeft - cLeft,
        Y: e.pageY || e.clientY + sTop - cTop
    }
}


/**
 * 获取目标节点的信息
 * @param {*} ele 目标节点
 * @param {*} prop 属性
 * @param {*} pseudo 伪元素
 * @returns 
 */
utils.getStyles = (ele, prop, pseudo = null) => {
    if (window.getComputedStyle) {
        if (prop) {
            return window.getComputedStyle(ele, pseudo)[prop];
        } else {
            return window.getComputedStyle(ele, pseudo);
        }
    } else {
        if (prop) {
            return ele.currentStyle[prop];
        } else {
            return ele.currentStyle;
        }
    }
}

/**
 * 封装绑定函数
 * @param {*} ele   目标节点 
 * @param {*} type  事件
 * @param {*} fn    事件绑定函数
 */
utils.addEvent = (ele, type, fn) => {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, function () {
            fn.call(ele);
        })
    } else {
        ele['on' + type] = fn;
    }
}

/**
 * 解除绑定函数
 * @param {*} ele   目标节点 
 * @param {*} type  事件
 * @param {*} fn    事件绑定函数
 */
utils.removeEvent = (ele, type, fn) => {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false);
    } else if (ele.detachEvent) {
        ele.detachEvent('on' + type, fn);
    } else {
        ele['on' + type] = null;
    }
}

/**
 * 取消冒泡
 * @param {*} e event 
 */
utils.cancelBubble = (e) => {
    var e = e || window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

/**
 * 阻止默认事件
 * @param {*} e 
 */
utils.preventDefault = (e) => {
    var e = e || window.event;
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}


// 预测点是否在三角形中
function vec(a, b) {
    return {
        x: b.x - a.x,
        y: b.y - a.y
    }
}

function vecProduct(v1, v2) {
    return v1.x * v2.y - v2.x * v1.y;
}

function sameSymbols(a, b) {
    return (a ^ b) >= 0;
}

utils.pointInTriangle = (p, a, b, c) => {
    var PA = vec(p, a),
        PB = vec(p, b),
        PC = vec(p, c),
        R1 = vecProduct(PA, PB),
        R2 = vecProduct(PB, PC),
        R3 = vecProduct(PC, PA);

    return sameSymbols(R1, R2) && sameSymbols(R2, R3);
}