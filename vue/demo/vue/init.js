import proxyData from "./proxy";

function initState(vm) {
    var options = vm.$options;

    if (options.data) {
        initData(vm);
    }
}

function initData(vm) {
    var data = vm.$options.data;

    data = vm._data = typeof data === 'function' ? data.call(vm) : data || {};

    for (var key in object) {
        (function (key) {
            proxyData(vm, '_data', key);
        })(key)
    }
}

export {
    initState,
}