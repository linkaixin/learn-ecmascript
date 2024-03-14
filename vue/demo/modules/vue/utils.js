export function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

export function transformToKebab(value) {
    return value.replace(/([A-Z])/g, '-$1').toLowerCase();
}