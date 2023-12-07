let utils = {};

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